import {
  PhoneDetailModel,
  IPhoneDetail,
  IPhoneSpecs,
  IPhoneColorOption,
  IPhoneStorageOption,
  IPhoneListItem
} from '../../types/phone.types';
import {
  colorOptionsMock,
  fullPhoneSpecs,
  phoneListItems,
  storageOptionsMock
} from '../mocks/types/phone.types.mocks';

describe('PhoneDetailModel', () => {
  let phoneDetail: IPhoneDetail;

  beforeEach(() => {
    phoneDetail = new PhoneDetailModel();
  });

  test('should initialize with default values', () => {
    //Check default values
    expect(phoneDetail.id).toBe('');
    expect(phoneDetail.brand).toBe('');
    expect(phoneDetail.name).toBe('');
    expect(phoneDetail.description).toBe('');
    expect(phoneDetail.basePrice).toBe(0);
    expect(phoneDetail.rating).toBe(0);

    const defaultSpecs: IPhoneSpecs[] = [];
    expect(phoneDetail.specs).toEqual(defaultSpecs);

    expect(phoneDetail.colorOptions).toEqual([]);
    expect(phoneDetail.storageOptions).toEqual([]);
    expect(phoneDetail.similarProducts).toEqual([]);
  });

  test('should allow setting values for properties', () => {
    phoneDetail.id = '12345';
    phoneDetail.brand = 'Apple';
    phoneDetail.name = 'iPhone 13';
    phoneDetail.description = 'Latest iPhone model';
    phoneDetail.basePrice = 999;
    phoneDetail.rating = 4.5;

    const phoneSpecs: IPhoneSpecs[] = fullPhoneSpecs;

    phoneDetail.specs = phoneSpecs;

    const colorOptions: IPhoneColorOption[] = colorOptionsMock;

    phoneDetail.colorOptions = colorOptions;

    const storageOptions: IPhoneStorageOption[] = storageOptionsMock;

    phoneDetail.storageOptions = storageOptions;

    const similarProducts: IPhoneListItem[] = phoneListItems;

    phoneDetail.similarProducts = similarProducts;

    // Check all values are updated
    expect(phoneDetail.id).toBe('12345');
    expect(phoneDetail.brand).toBe('Apple');
    expect(phoneDetail.name).toBe('iPhone 13');
    expect(phoneDetail.description).toBe('Latest iPhone model');
    expect(phoneDetail.basePrice).toBe(999);
    expect(phoneDetail.rating).toBe(4.5);

    expect(phoneDetail.specs).toEqual(phoneSpecs);
    expect(phoneDetail.colorOptions).toEqual(colorOptions);
    expect(phoneDetail.storageOptions).toEqual(storageOptions);
    expect(phoneDetail.similarProducts).toEqual(similarProducts);
  });

  test('should correctly initialize with the constructor', () => {
    const phoneDetail = new PhoneDetailModel();

    // Check constructor data
    expect(phoneDetail).toBeInstanceOf(PhoneDetailModel);
    expect(phoneDetail.specs).toStrictEqual([]);
    expect(phoneDetail.colorOptions).toEqual([]);
  });
});
