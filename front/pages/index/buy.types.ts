export interface D {
  bundleId: number
  bundle?: any
  amountToBuy: number
}

export interface M {
  getBundle: () => void
  buyBundle: () => void
}

export interface C {
  contractInstance?: any
  hasBundleAvailable: boolean
  hasEnoughAmount: boolean
  noBundle: string
}

export interface P {}
