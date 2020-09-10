import { Context } from '@nuxt/types'
import Web3 from 'web3'
import webClient from '~/api/webClient'
import getWeb3 from '~/utils/getWeb3'
import getContract from '~/utils/getContract'

export const actions = {
  // async registerWeb3(this: Context, { commit }, payload: string) {
  //   try {
  //     const result = await webClient().getWeb3(payload)
  //     // result = await webClient().getNetwork(result)
  //     // result = await webClient().getBalance(payload, result)
  //     console.log(result)
  //     commit('registerWeb3Instance', result)
  //   } catch (e) {
  //     console.log('error in action registerWeb3', e)
  //   }
  registerWeb3({ commit, dispatch }) {
    console.log('registerWeb3 Action being executed')
    getWeb3
      .then(async (result) => {
        console.log('committing result to registerWeb3Instance mutation')
        await commit('registerWeb3Instance', result)
        // dispatch('pollWeb3')
      })
      .catch((e) => {
        console.log('error in action registerWeb3', e)
      })
  }, // Todo: c'est de la merde
  pollWeb3Dispatch({ commit }, payload) {
    console.log('pollWeb3 action being executed')
    commit('pollWeb3Instance', payload)
  },
  pollWeb3({ state, dispatch }) {
    let web3 = (window as any).web3
    web3 = new Web3(web3.currentProvider)

    setInterval(() => {
      if (web3 && state.web3.web3Instance) {
        if (web3.eth.coinbase !== state.web3.coinbase) {
          const newCoinbase = web3.eth.coinbase
          web3.eth.getBalance(web3.eth.coinbase, function(err, newBalance) {
            if (err) {
              console.log(err)
            } else {
              dispatch('pollWeb3Dispatch', {
                coinbase: newCoinbase,
                balance: parseInt(newBalance, 10),
              })
            }
          })
        } else {
          web3.eth.getBalance(state.web3.coinbase, (err, polledBalance) => {
            if (err) {
              console.log(err)
            } else if (parseInt(polledBalance, 10) !== state.web3.balance) {
              dispatch('pollWeb3Dispatch', {
                coinbase: state.web3.coinbase,
                balance: polledBalance,
              })
            }
          })
        }
      }
    }, 500)
  },
  getContractInstance({ commit }) {
    getContract
      .then((result) => {
        commit('registerContractInstance', result)
      })
      .catch((e) => console.log(e))
  },
}

export default actions
