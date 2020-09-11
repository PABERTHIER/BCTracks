export interface D {}

export interface M {}

export interface C {}

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
