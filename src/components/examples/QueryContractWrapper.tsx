import { useQueryContract } from "@terra-money/terra-utils"

export const QueryContractWrapper = () => {
  const { data: nfts } = useQueryContract({
    address: "terra1phr9fngjv7a8an4dhmhd0u0f98wazxfnzccqtyheq4zqrrp4fpuqw3apw9",
    queryMsg: {
      all_tokens: {},
    },
  })

  return <div>{nfts ? JSON.stringify(nfts) : <div>Loading</div>}</div>
}
