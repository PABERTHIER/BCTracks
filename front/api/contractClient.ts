import Web3 from 'web3'
import { address, ABI } from '~/utils/constants/trackContract'

export default () => ({
  async getContract() {
    const web3 = new Web3((window as any).web3.currentProvider)
    const trackContract = await web3.eth.contract(ABI, (error, result) => {
      if (error) {
        throw new Error(error)
      }
    })
    const trackContractInstance = await trackContract.at(
      address,
      (error, result) => {
        if (error) {
          throw new Error(error)
        }
      }
    )
    return trackContractInstance
  },
})
