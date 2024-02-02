import { useConnectedWallet } from "@terra-money/wallet-kit"
import classNames from "classnames/bind"
import { Navigation } from "components"
import { useNav } from "./config/routes"
import styles from "./App.module.scss"

const cx = classNames.bind(styles)

const App = () => {
  const connectedWallet = useConnectedWallet()
  const { element: routes } = useNav()

  return (
    <div className={cx("app-wrapper")}>
      <Navigation />
      {!connectedWallet ? <>Please Connect</> : routes}
    </div>
  )
}

export default App
