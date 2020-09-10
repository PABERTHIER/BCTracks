import { Context } from '@nuxt/types'
import webClient from '~/api/webClient'
import getWeb3 from '~/utils/getWeb3'

export const actions = {
  async registerWeb3(this: Context, { commit }, payload: string) {
    try {
      const result = await webClient().getWeb3(payload)
      // result = await webClient().getNetwork(result)
      // result = await webClient().getBalance(payload, result)
      console.log(result)
      commit('registerWeb3Instance', result)
    } catch (e) {
      console.log('error in action registerWeb3', e)
    }
    // getWeb3(payload)
    //   .then((result) => {
    //     console.log('committing result to registerWeb3Instance mutation')
    //     commit('registerWeb3Instance', result)
    //   })
    //   .catch((e) => {
    //     console.log('error in action registerWeb3', e)
    //   })
    // Todo: c'est de la merde
  },
  // registerWeb3({ commit }) {
  //   console.log('registerWeb3 Action being executed')
  //   getWeb3
  //     .then((result) => {
  //       console.log('committing result to registerWeb3Instance mutation')
  //       commit('registerWeb3Instance', result)
  //     })
  //     .catch((e) => {
  //       console.log('error in action registerWeb3', e)
  //     })
  // },
}

export default actions
