export interface D {
  bundleId: number
  bundle: undefined
  addressDelivery: string
}

export interface M {
  getContractInstance?: () => void
  submitBundle: () => void
  deliveryBundle: () => void
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
  noBundle: string
  hasBundleAvailable: boolean
  hasBundleSubmit: boolean
  hasBundleDelivery: boolean
}

export interface P {}
