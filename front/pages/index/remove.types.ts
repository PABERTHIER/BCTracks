export interface D {
  bundleId: number
  bundle?: any
}

export interface M {
  getContractInstance?: () => void
  getBundle: () => void
  removeBundle: () => void
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
  noBundle: string
}

export interface P {}
