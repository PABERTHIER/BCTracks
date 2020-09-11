export interface D {
  playgroundLink: string
}

export interface M {
  getAccount?: () => void
  getContractInstance?: () => void
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
}

export interface P {}
