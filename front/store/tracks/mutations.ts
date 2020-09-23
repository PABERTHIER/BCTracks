import { ITracksState } from './type'

export default {
  registerWeb3Instance(state: ITracksState, payload) {
    const result = payload
    const web3Copy = state.web3
    web3Copy.networkId = result.networkId
    web3Copy.balance = parseInt(result.balance, 10)
    web3Copy.isInjected = result.injectedWeb3
    web3Copy.web3Instance = result.web3
    state.web3 = web3Copy
  },
  setAccount(state: ITracksState, payload) {
    state.web3.coinbase = payload
  },
  registerContractInstance(state: ITracksState, payload) {
    state.contractInstance = () => payload
  },
}
