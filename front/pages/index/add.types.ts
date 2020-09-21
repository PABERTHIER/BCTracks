export interface D {
  data: {
    bundleId: number
    bundleNumber: number
    productName: string
    productNumber: number
  }
}

export interface M {
  getContractInstance?: () => void
  addBundle: () => void
  clear: () => void
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
