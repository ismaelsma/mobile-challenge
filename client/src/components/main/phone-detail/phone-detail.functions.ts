import {
  IPhoneColorOption,
  IPhoneDetail,
  IPhoneSpecs,
  IPhoneStorageOption
} from '../../../types/phone.types';

export const getMinorPrice = (options: IPhoneStorageOption[]) => {
  return options.reduce((min, option) => {
    return option.price < min.price ? option : min;
  })?.price;
};

export const checkContinueDisabled = (
  selectedColor: IPhoneColorOption,
  selectedStorage: IPhoneStorageOption
) => {
  return !selectedColor.name || !selectedStorage.capacity;
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
