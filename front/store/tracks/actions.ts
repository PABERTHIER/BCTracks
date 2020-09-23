import { Context } from '@nuxt/types'
import Web3 from 'web3'
import webClient from '~/api/webClient'
import contractClient from '~/api/contractClient'

export const actions = {
  async getAccount(this: Context, { commit, dispatch }) {
    try {
      const accounts = await webClient().getAccount()
      const account = accounts[0]
      commit('setAccount', accounts[0])
      const result = await webClient().getWeb3(account)
      commit('registerWeb3Instance', result)
      dispatch(
        'notifications/addNotification',
        {
          title: (this.app.i18n as any).t('miscellaneous.success') as string,
          msg: (this.app.i18n as any).t('miscellaneous.connected') as string,
          type: 'success',
          time: 5_000,
        },
        { root: true }
      )
    } catch (exception) {
      dispatch(
        'notifications/addNotification',
        {
          title: (this.app.i18n as any).t('miscellaneous.error') as string,
          msg: exception.message as string,
          type: 'error',
          time: 5_000,
        },
        { root: true }
      )
    }
  },
  async getContractInstance(this: Context, { commit, dispatch }) {
    try {
      const result = await contractClient().getContract()
      commit('registerContractInstance', result)
    } catch {}
  },
}

export default actions
