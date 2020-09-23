const address = '0x954995Cc04951E856D74612CAbBeDaca0eD06DBD'

const ABI = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_bundle_id',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_bundles_number',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: '_product_name',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: '_product_number',
        type: 'uint256',
      },
    ],
    name: 'Add_Bundle',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_certifier',
        type: 'address',
      },
    ],
    name: 'addCertifier',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_delivery',
        type: 'address',
      },
    ],
    name: 'addDelivery',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_supplier',
        type: 'address',
      },
    ],
    name: 'addSupplier',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_singleId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_bundles_to_send',
        type: 'uint256',
      },
    ],
    name: 'Buy_Bundle',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'certifier',
        type: 'address',
      },
    ],
    name: 'CertifierAdded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'certifier',
        type: 'address',
      },
    ],
    name: 'CertifierRemoved',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address payable',
        name: '_supplier',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_bundleId',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: '_bundleState',
        type: 'string',
      },
    ],
    name: 'Change_BundleState',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_singleId',
        type: 'uint256',
      },
    ],
    name: 'Del_Bundle',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_singleId',
        type: 'uint256',
      },
    ],
    name: 'Delivery_takeOver_Bundle',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'delivery',
        type: 'address',
      },
    ],
    name: 'DeliveryAdded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'delivery',
        type: 'address',
      },
    ],
    name: 'DeliveryRemoved',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_supplier',
        type: 'address',
      },
    ],
    name: 'removeSupplier',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'supplier',
        type: 'address',
      },
    ],
    name: 'SupplierAdded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'supplier',
        type: 'address',
      },
    ],
    name: 'SupplierRemoved',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: '_bundleId',
        type: 'uint256',
      },
    ],
    name: 'addedEvent',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: '_singleId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address payable',
        name: '_new_owner',
        type: 'address',
      },
    ],
    name: 'boughtEvent',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_certifier',
        type: 'address',
      },
    ],
    name: 'removeCertifier',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_delivery',
        type: 'address',
      },
    ],
    name: 'removeDelivery',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_singleId',
        type: 'uint256',
      },
      {
        internalType: 'address payable',
        name: '_delivery_key',
        type: 'address',
      },
    ],
    name: 'Submit_takeOver_Bundle',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: '_singleId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address payable',
        name: '_delivery_key',
        type: 'address',
      },
    ],
    name: 'submitTakeOverEvent',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address payable',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: '_singleId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address payable',
        name: '_delivery_key',
        type: 'address',
      },
    ],
    name: 'validateTakeOverEvent',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'bundles',
    outputs: [
      {
        internalType: 'address payable',
        name: 'supplier_key',
        type: 'address',
      },
      {
        internalType: 'address payable',
        name: 'owner_key',
        type: 'address',
      },
      {
        internalType: 'address payable',
        name: 'delivery_key',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'bundle_id',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'bundles_number',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'product_name',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'product_number',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'sale_date',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'state',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'certstate',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'isCertifier',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'isDelivery',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'isSupplier',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'total_bundleId',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]

export { address, ABI }
