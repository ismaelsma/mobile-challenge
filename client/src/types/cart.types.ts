import {
  IPhoneColorOption,
  IPhoneDetail,
  IPhoneStorageOption
} from './phone.types';

export interface ICartItemsModel {
  phoneInfo: IPhoneDetail;
  color: IPhoneColorOption;
  storage: IPhoneStorageOption;
  quantity: number;
}
