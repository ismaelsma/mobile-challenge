import {
  PhoneDetailModel,
  IPhoneDetail,
  IPhoneSpecs,
  IPhoneColorOption,
  IPhoneStorageOption,
  IPhoneListItem
} from '../../types/phone.types'; // Ajusta la ruta según la estructura de tu proyecto
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

  it('should initialize with default values', () => {
    // Verificar los valores predeterminados del modelo
    expect(phoneDetail.id).toBe('');
    expect(phoneDetail.brand).toBe('');
    expect(phoneDetail.name).toBe('');
    expect(phoneDetail.description).toBe('');
    expect(phoneDetail.basePrice).toBe(0);
    expect(phoneDetail.rating).toBe(0);

    // Verificar que `specs` está correctamente inicializado
    const defaultSpecs: IPhoneSpecs[] = [];
    expect(phoneDetail.specs).toEqual(defaultSpecs);

    // Verificar que `colorOptions`, `storageOptions` y `similarProducts` estén vacíos
    expect(phoneDetail.colorOptions).toEqual([]);
    expect(phoneDetail.storageOptions).toEqual([]);
    expect(phoneDetail.similarProducts).toEqual([]);
  });

  it('should allow setting values for properties', () => {
    // Modificar las propiedades del modelo
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

    // Verificar que los valores se hayan actualizado correctamente
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

  it('should correctly initialize with the constructor', () => {
    const phoneDetail = new PhoneDetailModel();

    expect(phoneDetail).toBeInstanceOf(PhoneDetailModel);
    expect(phoneDetail.specs).toStrictEqual([]);
    expect(phoneDetail.colorOptions).toEqual([]);
  });
});
