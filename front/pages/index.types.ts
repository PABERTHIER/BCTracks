export interface D {
  totalBundle: number
  isConnected: boolean
  isReloading: boolean
}

export interface M {
  getAccount?: () => void
  getContractInstance?: () => void
  getTotalBundle: () => void
  reload: () => void
  reloaded: () => void
}

export interface C {
  web3?: {
    isInjected: boolean
    web3Instance: any
    networkId: number
    coinbase: string
    balance: number
    error: any
  }
  contractInstance?: any
  connection: { status: string; class: string }
}

export interface P {}
