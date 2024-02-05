import { SectionContainer } from "components/SectionContainer"
import { TransactionProvider } from "contexts"
import {
  QueryContractDirect,
  QueryContractWrapper,
  SendTokens,
  TransactionStatus,
} from "components"
import styles from "./Content.module.scss"

export const Content = () => {
  return (
    <div className={styles.container}>
      <TransactionProvider>
        <SectionContainer
          background
          expandable
          expansionTitle={"Transaction Status"}
        >
          <TransactionStatus />
        </SectionContainer>
        <SectionContainer expandable expansionTitle={"Send Tokens"}>
          <SendTokens />
        </SectionContainer>
      </TransactionProvider>
      <SectionContainer
        background
        expandable
        expansionTitle={"Contract Queries"}
      >
        <QueryContractDirect />
        <QueryContractWrapper />
      </SectionContainer>
    </div>
  )
}
