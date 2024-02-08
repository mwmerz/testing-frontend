import {
  getInterchainAddresses,
  useBankBalances,
} from "@terra-money/terra-utils"
import { CoinBalance } from "types/balances"

export const BankBalances = () => {
  const addresses = getInterchainAddresses({
    "60": "1b160c1b161b0f170415041c03100a110711091e0e10011c1a050f09011a1d02",
    "118": "1a02150713000110120b010e040c0d191b0f011c1f130f181f0a06000d15130e",
    "330": "1c0a0709081c0f0105051917050618151a0a11161a180e1a001b090d131f051c",
  })

  // Use the hook to fetch bank balances
  const {
    data: balances,
    isLoading,
    error,
  } = useBankBalances({
    addresses,
  })

  console.log(balances)

  // Loading state
  if (isLoading) {
    return <div>Loading balances...</div>
  }

  // Error state
  if (error) {
    return <div>An error occurred: {error.message}</div>
  }

  // Success state
  return (
    <div>
      <h2>Bank Balances</h2>
      {balances && balances.length > 0 ? (
        <ul>
          {balances.map((chainBalances: CoinBalance[], i: number) => (
            <li key={i}>
              <ul>
                {chainBalances.map((balance) => (
                  <li key={balance.denom}>
                    {balance.denom}: {balance.amount}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <div>No balances found.</div>
      )}
    </div>
  )
}

export default BankBalances
