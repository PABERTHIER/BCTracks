export interface ITracksState {
  web3: {
    isInjected: boolean
    web3Instance: any
    networkId: number
    coinbase: string
    balance: number
    error: any
  }
  contractInstance: any
}
