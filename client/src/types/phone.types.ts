export interface IPhoneListItem {
  id: string;
  brand: string;
  name: string;
  basePrice: number;
  imageUrl: string;
}

export interface IPhoneSpecs {
  screen: string;
  resolution: string;
  processor: string;
  mainCamera: string;
  selfieCamera: string;
  battery: string;
  os: string;
  screenRefreshRate: string;
}

interface IPhoneColorOptions {
  name: string;
  hexCode: string;
  imageUrl: string;
}

export interface IPhoneStorageOptions {
  capacity: string;
  price: number;
}

export interface IPhoneDetail {
  id: string;
  brand: string;
  name: string;
  description: string;
  basePrice: number;
  rating: number;
  specs: IPhoneSpecs;
  colorOptions: IPhoneColorOptions[];
  storageOptions: IPhoneStorageOptions[];
  similarProducts: IPhoneListItem[];
}

export class PhoneDetailModel implements IPhoneDetail {
  id: string;
  brand: string;
  name: string;
  description: string;
  basePrice: number;
  rating: number;
  specs: IPhoneSpecs;
  colorOptions: IPhoneColorOptions[];
  storageOptions: IPhoneStorageOptions[];
  similarProducts: IPhoneListItem[];

  constructor() {
    this.id = '';
    this.brand = '';
    this.name = '';
    this.description = '';
    this.basePrice = 0;
    this.rating = 0;
    this.specs = {
      screen: '',
      resolution: '',
      processor: '',
      mainCamera: '',
      selfieCamera: '',
      battery: '',
      os: '',
      screenRefreshRate: ''
    };
    this.colorOptions = [];
    this.storageOptions = [];
    this.similarProducts = [];
  }
}
