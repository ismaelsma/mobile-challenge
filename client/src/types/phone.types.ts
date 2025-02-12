export interface IPhoneListItem {
  id: string;
  brand: string;
  name: string;
  basePrice: number;
  imageUrl: string;
}

export interface IServicePhoneSpecs {
  screen: string;
  resolution: string;
  processor: string;
  mainCamera: string;
  selfieCamera: string;
  battery: string;
  os: string;
  screenRefreshRate: string;
  [key: string]: string;
}

export interface IPhoneSpecs {
  title: string;
  value: string;
}

export interface IPhoneColorOption {
  name: string;
  hexCode: string;
  imageUrl: string;
}

export interface IPhoneStorageOption {
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
  specs: IPhoneSpecs[];
  colorOptions: IPhoneColorOption[];
  storageOptions: IPhoneStorageOption[];
  similarProducts: IPhoneListItem[];
}

export class PhoneDetailModel implements IPhoneDetail {
  id: string;
  brand: string;
  name: string;
  description: string;
  basePrice: number;
  rating: number;
  specs: IPhoneSpecs[];
  colorOptions: IPhoneColorOption[];
  storageOptions: IPhoneStorageOption[];
  similarProducts: IPhoneListItem[];

  constructor() {
    this.id = '';
    this.brand = '';
    this.name = '';
    this.description = '';
    this.basePrice = 0;
    this.rating = 0;
    this.specs = [];
    this.colorOptions = [];
    this.storageOptions = [];
    this.similarProducts = [];
  }
}
