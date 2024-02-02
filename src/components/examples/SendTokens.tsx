import { useState, useEffect } from "react"
import { useWallet } from "@terra-money/wallet-kit"
import {
  useSendTokens,
  usePollTransactionStatus,
} from "@terra-money/terra-utils"
import { useAppContext } from "contexts"
import { Button } from "components"

export const SendTokens = () => {
  const wallet = useWallet()
  const { walletAddress } = useAppContext()

  const { sendTokensAsync, data: sendTokenMsg, error } = useSendTokens()
  const { pollTransactionAsync } = usePollTransactionStatus()

  const [shouldPost, setShouldPost] = useState(false)
  const [txHash, setTxHash] = useState("")
  const [polling, setPolling] = useState(false)
  const [pollingResponse, setPollingResponse] = useState("")

  const handleSendClick = async (
    to: string,
    from: string,
    denom: string,
    amount: number
  ) => {
    try {
      await sendTokensAsync({
        senderAddress: { address: from, chain: "phoenix-1" },
        recipientAddress: { address: to, chain: "phoenix-1" },
        amount: [{ denom: denom, amount: amount.toString() }],
      })
      setShouldPost(true)
    } catch (err) {
      console.error("Error creating token send message:", err, error)
      setShouldPost(false)
    }
  }

  // handle receiving the sendTokenMsg and posting it to the wallet
  useEffect(() => {
    const postToWallet = async () => {
      if (sendTokenMsg && shouldPost) {
        try {
          const post_response = await wallet.post(sendTokenMsg)
          console.log(post_response)
          setTxHash(post_response.txhash)
        } catch (postError) {
          console.error("Error posting to wallet:", postError)
        } finally {
          setShouldPost(false)
        }
      }
    }

    postToWallet()
  }, [sendTokenMsg, shouldPost, wallet])

  // handle polling the transaction status and polling state
  useEffect(() => {
    const chainId = "phoenix-1"
    if (txHash) {
      setPolling(true)
      setPollingResponse("")
      pollTransactionAsync({ txhash: txHash, chainId: chainId })
        .then((response) => {
          console.log("Transaction successfully polled:", response)
          setPollingResponse(JSON.stringify(response))
        })
        .catch((pollError) => {
          console.error("Error polling transaction status:", pollError)
          setPollingResponse(JSON.stringify(pollError))
        })
        .finally(() => {
          setPolling(false)
        })
    }
  }, [txHash, pollTransactionAsync])

  return (
    <div>
      <h1>Send Tokens</h1>
      <div>From: {walletAddress}</div>
      <div>
        Polling:{" "}
        {polling
          ? "Posting Tx, waiting for confirm"
          : "Polling done or not started.  use tx response for feedback."}
      </div>
      <div
        style={{
          height: 200,
          overflow: "scroll",
          padding: 8,
          border: "1px solid #ededed",
          margin: 8,
        }}
      >
        Polling Response: {pollingResponse}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <Button
          onClick={() =>
            handleSendClick(
              "terra1u28fgu0p99eh9xc4623k6cw6qmfdnl9un23yxs",
              "terra1u28fgu0p99eh9xc4623k6cw6qmfdnl9un23yxs",
              "uluna",
              1
            )
          }
        >
          Send 1 Luna to myself
        </Button>
      </div>
    </div>
  )
}
