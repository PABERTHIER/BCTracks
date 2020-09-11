import { ITracksState } from './type'

export const state = (): ITracksState => ({
  web3: {
    isInjected: false,
    web3Instance: null,
    networkId: 0,
    coinbase: '',
    balance: 0,
    error: null,
  },
  contractInstance: null,
})

export default state
