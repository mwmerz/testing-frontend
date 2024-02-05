import { createContext, useState, useEffect, ReactNode, useMemo } from "react"
import { CreateTxOptions } from "@terra-money/feather.js"
import { useWallet } from "@terra-money/wallet-kit"
import { usePollTransactionStatus } from "@terra-money/terra-utils"

interface ITransactionState {
  txHash: string
  msg: CreateTxOptions | undefined
  polling: boolean
  pollingResponse: string
  updateMessage: (msg: CreateTxOptions) => void
}

export const TransactionContext = createContext<ITransactionState>(
  {} as ITransactionState
)

const TransactionContextProvider = ({ children }: { children: ReactNode }) => {
  const wallet = useWallet()

  // The below code handles transaction logic and response.
  // pollTransactionStatus polls the transaction status
  const { pollTransactionAsync } = usePollTransactionStatus()
  const [txHash, setTxHash] = useState("")
  const [msg, setMsg] = useState<CreateTxOptions>()
  const [polling, setPolling] = useState(false)
  const [pollingResponse, setPollingResponse] = useState("")

  const updateMessage = (msg: CreateTxOptions) => {
    setMsg(msg)
  }

  // handle receiving the sendTokenMsg and posting it to the wallet
  useEffect(() => {
    const postToWallet = async () => {
      if (msg) {
        try {
          const post_response = await wallet.post(msg)
          console.log(post_response)
          setTxHash(post_response.txhash)
          setMsg(undefined)
        } catch (postError) {
          console.error("Error posting to wallet:", postError)
        }
      }
    }

    postToWallet()
  }, [msg, wallet])

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

  const contextValue = useMemo(
    () => ({
      txHash,
      msg,
      polling,
      pollingResponse,
    }),
    [txHash, msg, polling, pollingResponse]
  )

  return (
    <TransactionContext.Provider value={{ ...contextValue, updateMessage }}>
      {children}
    </TransactionContext.Provider>
  )
}

export default TransactionContextProvider
