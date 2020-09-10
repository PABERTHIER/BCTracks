import { ITracksState } from './type'

export const state = (): ITracksState => ({
  web3: {
    isInjected: false,
    web3Instance: null,
    networkId: null,
    coinbase: null,
    balance: null,
    error: null,
  },
  contractInstance: null,
})

export default state
