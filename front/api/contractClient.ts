import Web3 from 'web3'
import { address, ABI } from '~/utils/constants/trackContract'

export default () => ({
  getContract() {
    return new Promise(async function(resolve, reject) {
      const web3 = new Web3((window as any).web3.currentProvider)
      const trackContract = await web3.eth.contract(ABI)
      const trackContractInstance = await trackContract.at(address)
      // trackContractInstance = () => trackContractInstance
      resolve(trackContractInstance)
    })
  },
})
