import { IPhoneDetail, IPhoneListItem } from './phone.types';

export interface IPhoneListContext {
  phonesList: IPhoneListItem[];
  loading: boolean;
  fetchPhonesList: (searchText?: string) => Promise<void>;
}

export interface IPhoneDetailContext {
  phoneDetail: IPhoneDetail;
  loading: boolean;
  fetchPhoneDetail: (phone: string) => Promise<void>;
}

export interface ICartItemsContext {
  cartItems: string[];
  addItem: (item: string) => void;
  deleteItem: (item: string) => void;
  displayCart: () => void;
  hideCart: () => void;
  cartDisplayed: boolean;
}
