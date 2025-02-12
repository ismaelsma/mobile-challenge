export const similarProductsMock = [
  { id: '2', name: 'Phone 2' },
  { id: '3', name: 'Phone 3' }
];

export const fetchPhoneDetailMock = {
  id: '1',
  name: 'Phone 1',
  description: 'This is a great phone',
  similarProducts: similarProductsMock
};

export const fetchPhoneDetailEmptyMock = {
  id: '1',
  name: 'Phone 1',
  description: 'This is a great phone',
  similarProducts: []
};

export const cartListDataTwoItems = [
  {
    phoneInfo: { id: '1', name: 'Phone 1' },
    color: { hexCode: '#ff0000' },
    storage: { capacity: '64GB' },
    quantity: 1
  },
  {
    phoneInfo: { id: '2', name: 'Phone 2' },
    color: { hexCode: '#00ff00' },
    storage: { capacity: '128GB' },
    quantity: 1
  }
];

export const cartListDataOneItem = [
  {
    phoneInfo: { id: '1', name: 'Phone 1' },
    color: { hexCode: '#ff0000' },
    storage: { capacity: '64GB' },
    quantity: 1
  }
];

export const cartListDataTwoQuantity = [
  {
    phoneInfo: { id: '1', name: 'Phone 1' },
    color: { hexCode: '#ff0000' },
    storage: { capacity: '64GB' },
    quantity: 2
  }
];

export const cartListDataFullOneItem = [
  {
    phoneInfo: {
      id: '1',
      brand: 'Brand Name',
      name: 'Phone 1',
      description: 'This is a phone description',
      basePrice: 699,
      rating: 4.5,
      specs: [
        {
          title: 'SCREEN',
          value: '6.5 inches'
        },
        {
          title: 'RESOLUTION',
          value: '1080p'
        },
        {
          title: 'PROCESSOR',
          value: 'Snapdragon 888'
        },
        {
          title: 'MAIN CAMERA',
          value: '108 MP'
        },
        {
          title: 'SELFIE CAMERA',
          value: '32 MP'
        },
        {
          title: 'BATTERY',
          value: '4500 mAh'
        },
        {
          title: 'OS',
          value: 'Android 11'
        },
        {
          title: 'SCREEN REFRESH RATE',
          value: '90Hz'
        }
      ],
      colorOptions: [
        { name: 'Red', hexCode: '#ff0000', imageUrl: 'imageUrlRed' },
        { name: 'Blue', hexCode: '#0000ff', imageUrl: 'imageUrlBlue' }
      ],
      storageOptions: [
        { capacity: '64GB', price: 0 },
        { capacity: '128GB', price: 100 }
      ],
      similarProducts: [
        {
          id: '2',
          brand: 'Brand2',
          name: 'Phone 2',
          basePrice: 599,
          imageUrl: 'imageUrlPhone2'
        },
        {
          id: '3',
          brand: 'Brand3',
          name: 'Phone 3',
          basePrice: 799,
          imageUrl: 'imageUrlPhone3'
        }
      ]
    },
    color: { hexCode: '#ff0000', name: 'red', imageUrl: 'image.jpg' },
    storage: { capacity: '64GB', price: 100 },
    quantity: 1
  }
];

export const cartStorageObject = { capacity: '64GB', price: 100 };

export const cartColorObject = {
  hexCode: '#ff0000',
  name: 'red',
  imageUrl: 'image.jpg'
};

export const cartItemObject = {
  id: '1',
  brand: 'Brand Name',
  name: 'Phone 1',
  description: 'This is a phone description',
  basePrice: 699,
  rating: 4.5,
  specs: [
    { title: 'SCREEN', value: '6.5 inches' },
    { title: 'RESOLUTION', value: '1080p' },
    { title: 'PROCESSOR', value: 'Snapdragon 888' },
    { title: 'MAIN CAMERA', value: '108 MP' },
    { title: 'SELFIE CAMERA', value: '32 MP' },
    { title: 'BATTERY', value: '4500 mAh' },
    { title: 'OS', value: 'Android 11' },
    { title: 'SCREEN REFRESH RATE', value: '90Hz' }
  ],
  colorOptions: [
    { name: 'Red', hexCode: '#ff0000', imageUrl: 'imageUrlRed' },
    { name: 'Blue', hexCode: '#0000ff', imageUrl: 'imageUrlBlue' }
  ],
  storageOptions: [
    { capacity: '64GB', price: 0 },
    { capacity: '128GB', price: 100 }
  ],
  similarProducts: [
    {
      id: '2',
      brand: 'Brand2',
      name: 'Phone 2',
      basePrice: 599,
      imageUrl: 'imageUrlPhone2'
    },
    {
      id: '3',
      brand: 'Brand3',
      name: 'Phone 3',
      basePrice: 799,
      imageUrl: 'imageUrlPhone3'
    }
  ]
};

export const phoneListObject = [
  { id: '1', name: 'Phone 1' },
  { id: '2', name: 'Phone 2' },
  { id: '3', name: 'Phone 3' }
];
