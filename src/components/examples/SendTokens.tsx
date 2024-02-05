import React, { useState, useEffect, useCallback, ChangeEvent } from "react"
import { useSendTokens } from "@terra-money/terra-utils"
import { useAppContext, useTransactionContext } from "contexts"
import { Button } from "components"

import styles from "./SendTokens.module.scss"
import classNames from "classnames/bind"

const cx = classNames.bind(styles)

// Assuming these types are defined somewhere in your project
interface SendTokensParams {
  senderAddress: { address: string; chain: string }
  recipientAddress: { address: string; chain: string }
  amount: { denom: string; amount: string }[]
}

interface AppContextType {
  walletAddress: string
}

export const SendTokens: React.FC = () => {
  const { walletAddress } = useAppContext() as AppContextType
  const { updateMessage } = useTransactionContext()
  const { sendTokensAsync, data } = useSendTokens()

  const [sendDenom, setSendDenom] = useState<string>("uluna")
  const [sendAmount, setSendAmount] = useState<number>(1)
  const [recipientAddress, setRecipientAddress] = useState<string>(
    walletAddress || ""
  )
  const [feedbackMessage, setFeedbackMessage] = useState<string>("")

  useEffect(() => {
    setRecipientAddress(walletAddress || "")
  }, [walletAddress])

  useEffect(() => {
    if (data) {
      console.log("running update message:", data)
      updateMessage(data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const handleSendClick = useCallback(async () => {
    if (!recipientAddress || sendAmount <= 0) {
      setFeedbackMessage("Invalid recipient address or amount.")
      return
    }

    try {
      await sendTokensAsync({
        senderAddress: { address: walletAddress, chain: "phoenix-1" },
        recipientAddress: { address: recipientAddress, chain: "phoenix-1" },
        amount: [{ denom: sendDenom, amount: sendAmount.toString() }],
      } as SendTokensParams)
    } catch (err) {
      console.error("Error creating token send message:", err)
      setFeedbackMessage("Failed to send tokens. Please try again.")
    }
  }, [sendTokensAsync, walletAddress, recipientAddress, sendDenom, sendAmount])

  const resetForm = () => {
    setRecipientAddress(walletAddress)
    setSendDenom("uluna")
    setSendAmount(1)
    setFeedbackMessage("")
  }

  const handleInputChange =
    <T extends string | number>(
      setter: React.Dispatch<React.SetStateAction<T>>
    ) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const value: string | number =
        event.target.type === "number"
          ? Number(event.target.value)
          : event.target.value
      setter(value as T)
    }

  return (
    <div>
      <div style={{ display: "flex", gap: 8 }}>
        {walletAddress ? (
          <div className={cx("sendbox")}>
            <InputField
              label="Recipient Address"
              value={recipientAddress}
              onChange={handleInputChange(setRecipientAddress)}
            />
            <InputField
              label="Denomination"
              value={sendDenom}
              onChange={handleInputChange(setSendDenom)}
            />
            <InputField
              type="number"
              label="Amount"
              value={sendAmount.toString()}
              onChange={handleInputChange(setSendAmount)}
            />
            <div className={cx("submit_container")}>
              <Button className={cx("submit_button")} onClick={handleSendClick}>
                Send {sendAmount} {sendDenom} to {recipientAddress}
              </Button>
              <Button className={cx("reset_button")} onClick={resetForm}>
                Reset
              </Button>
              {feedbackMessage && <p>{feedbackMessage}</p>}
            </div>
          </div>
        ) : (
          <p>Please connect your wallet to send tokens.</p>
        )}
      </div>
    </div>
  )
}

interface InputFieldProps {
  label: string
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  type?: string
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  type = "text",
}) => (
  <div className={cx("input_container")}>
    <label>{label}</label>
    <input
      className={cx("input_control")}
      type={type}
      value={value}
      onChange={onChange}
    />
  </div>
)
