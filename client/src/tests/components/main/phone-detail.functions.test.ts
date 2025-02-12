import {
  adaptSpecsToList,
  getMinorPrice
} from '../../../components/main/phone-detail/phone-detail.functions';
import { IPhoneStorageOption } from '../../../types/phone.types';
import {
  mockFunctionOption,
  mockFunctionOptions,
  mockFunctionOptionsDisordered,
  mockFunctionOptionsDisordered2,
  mockFunctionsSpecs,
  mockFunctionsSpecsParsed
} from '../../mocks/components/main/phone-detail.functions.mocks';

describe('adaptSpecsToList function', () => {
  test('should adapt specs correctly', () => {
    const adaptedList = adaptSpecsToList([mockFunctionsSpecs]);
    expect(adaptedList).toEqual(mockFunctionsSpecsParsed);
  });
});

describe('getMinorPrice function', () => {
  test('should return the lowest price when multiple options are provided', () => {
    const result = getMinorPrice(mockFunctionOptions);

    // Check price is 100
    expect(result).toBe(100);
  });

  test('should return the only price when there is only one option', () => {
    const result = getMinorPrice(mockFunctionOption);

    // Check price is 120
    expect(result).toBe(120);
  });

  test('should return 0 for an empty list', () => {
    const options: IPhoneStorageOption[] = [];

    const result = getMinorPrice(options);

    // Check empty array price is 0
    expect(result).toBe(0);
  });

  test('should correctly compare prices using reduce', () => {
    const result = getMinorPrice(mockFunctionOptionsDisordered);

    // Check minor price is 100
    expect(result).toBe(100);

    const result2 = getMinorPrice(mockFunctionOptionsDisordered2);

    // Check minor price is 150
    expect(result2).toBe(150);
  });
});
