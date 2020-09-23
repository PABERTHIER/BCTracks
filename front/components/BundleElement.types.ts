export interface D {
  bundle: any
}

export interface M {
  getBundle: () => void
}

export interface C {
  contractInstance?: any
  date: string
}

export interface P {
  bundleId: number | string
  connection: string
  bundleData?: any
}
