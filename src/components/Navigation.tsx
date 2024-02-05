import { useWallet } from "@terra-money/wallet-kit"
import classNames from "classnames/bind"
import { useAppContext } from "contexts"
import styles from "./Navigation.module.scss"

const cx = classNames.bind(styles)

export const Navigation = () => {
  const wallet = useWallet()
  const { walletAddress } = useAppContext()

  const handleConnectClick = () => {
    if (walletAddress) {
      wallet.disconnect()
    } else {
      wallet.connect()
    }
  }
  return (
    <div className={cx("navigation__container")}>
      <div className={cx("navigation__wrapper")}>
        <button onClick={handleConnectClick}>
          {walletAddress ? (
            <>Connected - {walletAddress}</>
          ) : (
            <>Connect Wallet</>
          )}
        </button>
      </div>
    </div>
  )
}
