import { useAppContext, useTransactionContext } from "contexts"

export const TransactionStatus = () => {
  const { walletAddress } = useAppContext()
  const { polling, pollingResponse } = useTransactionContext()
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
    </div>
  )
}
