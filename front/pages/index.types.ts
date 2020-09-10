export interface D {
  address: string
  playgroundLink: string
}

export interface M {
  registerWeb3?: (address: string) => void
}

export interface C {
  web3?: {
    isInjected: boolean
    web3Instance: any
    networkId: any
    coinbase: any
    balance: any
    error: any
  }
  // Todo: type
}

export interface P {}
