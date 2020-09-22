export interface D {
  bundleId: number
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
}

export interface P {}
