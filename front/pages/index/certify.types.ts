export interface D {
  bundleId: number
  bundle?: any
}

export interface M {
  getBundle: () => void
  certifyBundle: () => void
}

export interface C {
  contractInstance?: any
  hasBundleAvailable: boolean
  noBundle: string
}

export interface P {}
