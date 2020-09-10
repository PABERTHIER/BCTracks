export interface ITracksState {
  web3: {
    isInjected: boolean
    web3Instance: any
    networkId: any
    coinbase: any
    balance: any
    error: any
  }
  contractInstance: any
  // Todo: virer any en checkant type dans devtools
}
