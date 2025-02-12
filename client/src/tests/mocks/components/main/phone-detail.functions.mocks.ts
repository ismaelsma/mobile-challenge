import { IPhoneStorageOption } from '../../../../types/phone.types';

export const mockFunctionsSpecs = {
  screen: '6.5 inches',
  resolution: '1080 x 2400',
  processor: 'Snapdragon 888',
  mainCamera: '108MP',
  selfieCamera: '32MP',
  battery: '4500mAh',
  os: 'Android 11',
  screenRefreshRate: '120Hz',
  unknown: 'Value'
};

export const mockFunctionsSpecsParsed = [
  { title: 'SCREEN', value: '6.5 inches' },
  { title: 'RESOLUTION', value: '1080 x 2400' },
  { title: 'PROCESSOR', value: 'Snapdragon 888' },
  { title: 'MAIN CAMERA', value: '108MP' },
  { title: 'SELFIE CAMERA', value: '32MP' },
  { title: 'BATTERY', value: '4500mAh' },
  { title: 'OS', value: 'Android 11' },
  { title: 'SCREEN REFRESH RATE', value: '120Hz' },
  { title: 'OTHER', value: 'Value' } // 'unknown' se mapea a 'OTHER'
];

export const mockFunctionOptions: IPhoneStorageOption[] = [
  { capacity: '64GB', price: 100 },
  { capacity: '128GB', price: 150 },
  { capacity: '256GB', price: 200 }
];

export const mockFunctionOption: IPhoneStorageOption[] = [
  { capacity: '64GB', price: 120 }
];

export const mockFunctionOptionsDisordered: IPhoneStorageOption[] = [
  { capacity: '64GB', price: 120 },
  { capacity: '128GB', price: 100 },
  { capacity: '256GB', price: 150 }
];

export const mockFunctionOptionsDisordered2: IPhoneStorageOption[] = [
  { capacity: '64GB', price: 200 },
  { capacity: '128GB', price: 150 },
  { capacity: '256GB', price: 180 }
];
