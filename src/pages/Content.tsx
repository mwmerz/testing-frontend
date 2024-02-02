import { SectionContainer } from "components/SectionContainer"
import {
  QueryContractDirect,
  QueryContractWrapper,
  SendTokens,
} from "components"
import styles from "./Content.module.scss"

export const Content = () => {
  return (
    <div className={styles.container}>
      <SectionContainer style={{ marginTop: 24 }}>
        <SendTokens />
      </SectionContainer>
      <SectionContainer style={{ marginTop: 24 }}>
        <QueryContractDirect />
        <QueryContractWrapper />
      </SectionContainer>
    </div>
  )
}
