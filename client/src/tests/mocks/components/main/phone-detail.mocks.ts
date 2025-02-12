export const mockPhoneDetail = {
  id: '1',
  name: 'Phone X',
  colorOptions: [
    { hexCode: '#000000', name: 'Black', imageUrl: 'black-image.jpg' },
    { hexCode: '#FFFFFF', name: 'White', imageUrl: 'white-image.jpg' }
  ],
  storageOptions: [
    { capacity: '64GB', price: 100 },
    { capacity: '128GB', price: 150 }
  ],
  similarProducts: [{ id: '2', name: 'Phone Y', imageUrl: 'phone-y.jpg' }],
  specs: [{ title: 'Camera', value: '12MP' }]
};
