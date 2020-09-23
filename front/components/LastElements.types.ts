export interface D {
  bundle?: any
}

export interface M {
  reloaded: (bundleId: number) => void
}

export interface C {
  totalElement: number
}

export interface P {
  numberOfElements: number
  totalBundle: number
  connection: string
  isReloading: boolean
}
