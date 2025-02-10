import {
  IPhoneDetail,
  IPhoneSpecs,
  IPhoneStorageOptions
} from '../../../types/phone.types';

export const getPhoneImageSrc = (
  phoneDetail: IPhoneDetail,
  selectedColor: string
) => {
  return phoneDetail.colorOptions.find(
    (color) => color.hexCode === selectedColor
  )?.imageUrl;
};

export const getMinorPrice = (options: IPhoneStorageOptions[]) => {
  return options.reduce((min, option) => {
    return option.price < min.price ? option : min;
  })?.price;
};

export const checkContinueDisabled = (
  selectedColor: string,
  selectedStorage: string
) => {
  return !selectedColor || !selectedStorage;
};

export const parseKey = (key: string) => {
  switch (key) {
    case 'screen':
      return 'SCREEN';
    case 'resolution':
      return 'RESOLUTION';
    case 'processor':
      return 'PROCESSOR';
    case 'mainCamera':
      return 'MAIN CAMERA';
    case 'selfieCamera':
      return 'SELFIE CAMERA';
    case 'battery':
      return 'BATTERY';
    case 'os':
      return 'OS';
    case 'screenRefreshRate':
      return 'SCREEN REFRESH RATE';
    default:
      return 'OTHER';
  }
};

export const adaptSpecsToList = (specs: IPhoneSpecs) => {
  return Object.keys(specs).map((key) => {
    return {
      title: parseKey(key),
      value: specs[key]
    };
  });
};
