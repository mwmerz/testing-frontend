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
        <SectionContainer style={{ marginTop: 24 }}>
          <TransactionStatus />
        </SectionContainer>
        <SectionContainer style={{ marginTop: 24 }}>
          <SendTokens />
        </SectionContainer>
      </TransactionProvider>
      <SectionContainer style={{ marginTop: 24 }}>
        <QueryContractDirect />
        <QueryContractWrapper />
      </SectionContainer>
    </div>
  )
}
