import {
  IPhoneColorOption,
  IPhoneDetail,
  IPhoneListItem,
  IPhoneStorageOption
} from './phone.types';
import { ICartItemsModel } from './cart.types';

export interface IPhoneListContext {
  phonesList: IPhoneListItem[];
  loading: boolean;
  prevSearch: string;
  fetchPhonesList: (searchText?: string) => Promise<void>;
  forceSetLoadingTrue: () => void;
}

export interface IPhoneDetailContext {
  phoneDetail: IPhoneDetail;
  loading: boolean;
  fetchPhoneDetail: (phone: string) => Promise<void>;
}

export interface ICartItemsContext {
  cartItems: ICartItemsModel[];
  addItem: (
    phoneItem: IPhoneDetail,
    color: IPhoneColorOption,
    storage: IPhoneStorageOption
  ) => void;
  deleteItem: (deleteIndex: number) => void;
  deleteAll: () => void;
}
