import { IPhoneDetail } from './phone.types';

export interface ICartItemsModel {
  phoneInfo: IPhoneDetail;
  color: string;
  storage: string;
  quantity: number;
}
