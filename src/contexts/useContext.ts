import { useContext } from "react"
import { AppContext } from "./AppContext"
import { TransactionContext } from "./TransactionContext"

export const useAppContext = () => {
  return useContext(AppContext)
}

export const useTransactionContext = () => {
  return useContext(TransactionContext)
}
