export interface D {
  playgroundLink: string
  data: {
    supplierKey: string
    bundleId: number
    bundleNumber: number
    productName: string
    productNumber: number
  }
}

export interface M {
  getAccount?: () => void
  getContractInstance?: () => void
  addProduct: () => void
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
