import { AccAddress } from "@terra-money/feather.js"

export const supportedNetworks = ["phoenix-1", "pisco-1"] as const
export type SupportedNetwork = (typeof supportedNetworks)[number]

export type ContractConfig = {
  contract: AccAddress
}

export const contracts: Record<SupportedNetwork, ContractConfig> = {
  "phoenix-1": {
    contract: "terra123",
  },
  "pisco-1": {
    contract: "terra123",
  },
}
