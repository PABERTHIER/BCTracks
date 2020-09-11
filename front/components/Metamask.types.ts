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
    networkId: number
    coinbase: string
    balance: number
    error: any
  }
}
