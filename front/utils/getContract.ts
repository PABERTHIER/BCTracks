import Web3 from 'web3'
import { address, ABI } from './constants/trackContract'

const getContract = new Promise(function(resolve, reject) {
  const web3 = new Web3((window as any).web3.currentProvider)
  const trackContract = web3.eth.contract(ABI)
  const trackContractInstance = trackContract.at(address)
  // trackContractInstance = () => trackContractInstance
  resolve(trackContractInstance)
})
export default getContract
