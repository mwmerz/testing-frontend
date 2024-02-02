import { LCDClient, TxInfo } from "@terra-money/feather.js"

export async function checkTxIsConfirmed(
  lcd: LCDClient,
  chainId: string,
  txHash: string
): Promise<TxInfo> {
  return await lcd.tx.txInfo(txHash, chainId)
}
