export interface D {}

export interface M {}

export interface C {
  network: string
  balance: number
}

export interface P {
  data: {
    isInjected: boolean
    web3Instance: any
    networkId: any
    coinbase: any
    balance: any
    error: any
  }
  // Todo: type
}
