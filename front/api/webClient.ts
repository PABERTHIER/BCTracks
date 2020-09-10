import Web3 from 'web3'

export default () => ({
  async getWeb3(address: string) {
    const web3js = (window as any).web3
    if (typeof web3js !== 'undefined') {
      const web3 = new Web3(web3js.currentProvider)
      let result = {
        injectedWeb3: web3.isConnected(),
        coinbase: address,
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
      result = await this.getBalance(result)
      console.log('toto')
      return result
    } else {
      throw new TypeError('Unable to connect to Metamask')
    }
  },
  //   getNetwork(result: any) {
  //     try {
  //       const networkId = result.web3().version.getNetwork()
  //       result = Object.assign({}, result, { networkId })
  //       return result
  //     } catch (e) {
  //       throw new Error('Unable to retrieve network ID')
  //     }
  //   },
  getNetwork(result: any) {
    return result.web3().eth.getNetwork((error, networkId) => {
      if (error) {
        throw new Error('Unable to retrieve network ID')
      } else {
        result = Object.assign({}, result, { networkId })
        return result
      }
    })
  },
  getBalance(result: any) {
    // try {
    return result.web3().eth.getBalance(result.coinbase, (error, balance) => {
      if (error) {
        throw new Error(
          'Unable to retrieve balance for address: ' + result.coinbase
        )
      } else {
        result = Object.assign({}, result, { balance })
        return result
      }
    })
    //   result = Object.assign({}, result, { balance })
    //   return result
    // } catch (e) {
    //   throw new Error(
    //     'Unable to retrieve balance for address: ' + (result as any).coinbase
    //   )
    // }
  },

  // web3.eth.getBalance(address, function (error, result) {
  //     if (!error) {
  //         console.log(result);
  //     } else {
  //         console.error(error);
  //     }
  // });

  //   getBalance(result: any) {
  //     return new Promise(function(resolve, reject) {
  //       console.log('toto')
  //       // Retrieve balance for coinbase
  //       ;(result as any)
  //         .web3()
  //         .eth.getBalance(result.coinbase, (err, balance) => {
  //           if (err) {
  //             console.log('toto error')
  //             reject(
  //               new Error(
  //                 'Unable to retrieve balance for address: ' +
  //                   (result as any).coinbase
  //               )
  //             )
  //           } else {
  //             console.log('toto success')
  //             result = Object.assign({}, result, { balance })
  //             console.log(result)
  //             resolve(result)
  //             return result
  //           }
  //         })
  //     })
  //   },
})
