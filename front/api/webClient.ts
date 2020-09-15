export default () => ({
  async getWeb3(address: string) {
    try {
      const { ethereum } = window as any
      if (typeof (window as any).ethereum !== 'undefined') {
        let result = {
          injectedWeb3: ethereum.isConnected(),
          coinbase: address,
          web3() {
            return ethereum
          },
        }
        const networkId = parseInt(ethereum.chainId, 16)
        result = Object.assign({}, result, { networkId })
        result = await this.getBalance(result)
        return result
      } else {
        throw new TypeError('Unable to connect to Metamask')
      }
    } catch {
      throw new TypeError('Unable to connect to Metamask')
    }
  },
  async getAccount() {
    const { ethereum } = window as any
    const account = await ethereum.request({
      method: 'eth_requestAccounts',
    })
    return account
  },
  async getBalance(result: any) {
    try {
      const { ethereum } = window as any
      let balance = await ethereum.request({
        method: 'eth_getBalance',
        params: [result.coinbase, 'latest'],
      })
      balance = parseInt(balance, 16)
      result = Object.assign({}, result, { balance })
      return result
    } catch {
      throw new Error(
        'Unable to retrieve balance for address: ' + result.coinbase
      )
    }
  },
})
