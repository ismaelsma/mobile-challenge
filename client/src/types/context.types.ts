import { IPhoneDetail, IPhoneListItem } from './phone.types';
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
  addItem: (phoneItem: IPhoneDetail, color: string, storage: string) => void;
  deleteItem: (deleteIndex: number) => void;
  displayCart: () => void;
  hideCart: () => void;
  cartDisplayed: boolean;
}
