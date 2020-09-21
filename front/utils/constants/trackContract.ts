const address = '0xf9eaF96AA946EB757775f9AB39Bd89b15C9Fd41b'

const ABI = [
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
    inputs: [],
    name: 'total_bundelId',
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
