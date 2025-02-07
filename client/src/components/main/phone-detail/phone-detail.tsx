import { useCartItemsContext, usePhoneDetailContext } from '../../../context';
import CartPage from '../cart-page/cart-page';
import PhonesPage from '../phones-page/phones-page';
import React, { useEffect } from 'react';
import { IPhoneDetailProps } from './phone-detail.types';

const PhoneDetail: React.FC<IPhoneDetailProps> = (props: IPhoneDetailProps) => {
  const { phone } = props;
  const { loading, phoneDetail } = usePhoneDetailContext();

  useEffect(() => {}, [phone]);

  return <div className="phone-detail"></div>;
};

export default PhoneDetail;
