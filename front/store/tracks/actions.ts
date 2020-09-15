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
      // dispatch('pollWeb3')
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
          msg: exception as string,
          type: 'error',
          time: 5_000,
        },
        { root: true }
      )
    }
  },
  pollWeb3Dispatch(this: Context, { commit, dispatch }, payload) {
    dispatch(
      'notifications/addNotification',
      {
        title: (this.app.i18n as any).t('miscellaneous.info') as string,
        msg: 'pollWeb3 action being executed',
        type: 'info',
        time: 5_000,
      },
      { root: true }
    )
    commit('pollWeb3Instance', payload)
  },
  pollWeb3(this: Context, { state, dispatch }) {
    // const { ethereum } = window as any
    let web3 = (window as any).web3
    web3 = new Web3((window as any).web3.currentProvider)

    setInterval(() => {
      if (web3 && state.web3.web3Instance) {
        if (web3.eth.coinbase !== state.web3.coinbase) {
          const newCoinbase = web3.eth.coinbase
          web3.eth.getBalance(web3.eth.coinbase, function(err, newBalance) {
            if (err) {
              dispatch(
                'notifications/addNotification',
                {
                  title: (this.app.i18n as any).t(
                    'miscellaneous.error'
                  ) as string,
                  msg: err as string,
                  type: 'error',
                  time: 5_000,
                },
                { root: true }
              )
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
              dispatch(
                'notifications/addNotification',
                {
                  title: (this.app.i18n as any).t(
                    'miscellaneous.error'
                  ) as string,
                  msg: err as string,
                  type: 'error',
                  time: 5_000,
                },
                { root: true }
              )
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
  async getContractInstance(this: Context, { commit, dispatch }) {
    try {
      const result = await contractClient().getContract()
      commit('registerContractInstance', result)
    } catch (e) {
      dispatch(
        'notifications/addNotification',
        {
          title: (this.app.i18n as any).t('miscellaneous.error') as string,
          msg: e as string,
          type: 'error',
          time: 5_000,
        },
        { root: true }
      )
    }
  },
}

export default actions
