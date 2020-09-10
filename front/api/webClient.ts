import Web3 from 'web3'

export default () => ({
  async getWeb3(address: string) {
    const web3js = (window as any).web3
    if (typeof web3js !== 'undefined') {
      const web3 = new Web3(web3js.currentProvider)
      let result = {
        injectedWeb3: web3.isConnected(),
        web3() {
          return web3
        },
        //   return {
        //     injectedWeb3: web3.isConnected(),
        //     web3() {
        //       return web3
        //     },
      }
      result = await this.getNetwork(result)
      result = await this.getBalance(address, result)
    } else {
      throw new TypeError('Unable to connect to Metamask')
    }
  },
  getNetwork(result: any) {
    try {
      const networkId = result.web3().version.getNetwork()
      result = Object.assign({}, result, { networkId })
      return result
    } catch (e) {
      throw new Error('Unable to retrieve network ID')
    }
  },
  getBalance(address: string, result: any) {
    try {
      //   console.log(result)
      const balance = result.web3().eth.getBalance(address)
      //   console.log(balance)
      result = Object.assign({}, result, { balance })
      //   console.log(result)
      return result
    } catch (e) {
      throw new Error(
        'Unable to retrieve balance for address: ' + (result as any).coinbase
      )
    }
  },
})
