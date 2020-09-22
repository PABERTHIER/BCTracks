export interface D {
  bundleId: number
  bundle?: any
}

export interface M {
  getBundle: () => void
  setBundleCertified: () => void
  setBundleUnsalable: () => void
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
  isCertified: boolean
  isUnsalable: boolean
  noBundle: string
}

export interface P {}
