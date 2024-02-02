import { useEffect, useState } from "react"
import { LCDClient } from "@terra-money/feather.js"
import { useLCDClient } from "@terra-money/terra-utils"
import type { UseQueryResult } from "@tanstack/react-query"

export const QueryContractDirect = () => {
  const [nfts, setNfts] = useState<string | undefined>()
  const { data: lcd } = useLCDClient() as UseQueryResult<LCDClient, Error>

  const queryNFTs = async () => {
    if (lcd) {
      return await lcd.wasm.contractQuery(
        "terra1phr9fngjv7a8an4dhmhd0u0f98wazxfnzccqtyheq4zqrrp4fpuqw3apw9",
        {
          all_tokens: {},
        }
      )
    }
  }

  useEffect(() => {
    queryNFTs().then((res) => {
      setNfts(JSON.stringify(res))
    })
  })

  return <div>{nfts ? nfts : <div>Loading</div>}</div>
}
