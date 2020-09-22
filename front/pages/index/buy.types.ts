export interface D {
  bundleId: number
  bundle?: any
  amountToBuy: number
}

export interface M {
  getContractInstance?: () => void
  getBundle: () => void
  buyBundle: () => void
}

export interface C {
  web3?: {
    isInjected: boolean
    web3Instance: any
    networkId: number
    coinbase: string
    balance: number
    error: any
  }
  contractInstance?: any
  hasBundleAvailable: boolean
  hasEnoughAmount: boolean
  noBundle: string
}

export interface P {}
