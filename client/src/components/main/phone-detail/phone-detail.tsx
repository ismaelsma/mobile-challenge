import {
  useCartItemsContext,
  usePhoneDetailContext,
  usePhonesListContext
} from '../../../context';
import CartPage from '../cart-page/cart-page';
import PhonesPage from '../phones-page/phones-page';
import React, { useEffect, useState } from 'react';
import { IPhoneDetailProps } from './phone-detail.types';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from '../../common/loader/loader';
import { IPhoneStorageOptions } from '../../../types/phone.types';

const PhoneDetail: React.FC = () => {
  const { loading, phoneDetail, fetchPhoneDetail } = usePhoneDetailContext();
  const { prevSearch, forceSetLoadingTrue } = usePhonesListContext();
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedStorage, setSelectedStorage] = useState<string>('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Extraer el parámetro 'search' de la query string solo una vez cuando el componente se monta
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('phoneid'); // El parámetro 'search'

    if (query) {
      fetchPhoneDetail(query);
    } else {
      navigate(`/phone-list`);
    }
  }, []);

  useEffect(() => {
    if (!loading && phoneDetail.id) {
      setSelectedColor(phoneDetail.colorOptions[0].hexCode);
    }
  }, [loading]);

  const getMobileImageSrc = (color: string) => {
    return phoneDetail.colorOptions.find(
      (color) => color.hexCode === selectedColor
    )?.imageUrl;
  };

  const getMinorPrice = (options: IPhoneStorageOptions[]) => {
    return options.reduce((min, option) => {
      return option.price < min.price ? option : min;
    })?.price;
  };

  const goBackAction = () => {
    const navigateUrl = `/phone-list${prevSearch ? `?search=${prevSearch}` : ''}`;
    forceSetLoadingTrue();
    navigate(navigateUrl);
  };

  return (
    <div className="phone-detail">
      <div className="phone-detail__return" onClick={goBackAction}>
        <img
          src="/assets/back-arrow.svg"
          alt="Go back logo"
          className="phone-detail__return-img back-arrow-img"
        />
        <p className="phone-detail__return-text">BACK</p>
      </div>
      <div className="phone-detail__content">
        {loading || !phoneDetail.id ? (
          <Loader />
        ) : (
          <>
            <div className="phone-detail__content-image">
              <img src={getMobileImageSrc(phoneDetail.id)} />
            </div>
            <div className="phone-detail__content-mainspecs">
              <div className="phone-detail__content-titles">
                <h1 className="phone-detail__content-titles-name">
                  {phoneDetail.name}
                </h1>
                <h2 className="phone-detail__content-titles-lowerprice">
                  From {getMinorPrice(phoneDetail.storageOptions)} EUR
                </h2>
              </div>
              <div className="phone-detail__content-storage">
                <h4 className="phone-detail__content-storage-title">
                  STORAGE. HOW MUCH SPACE DO YOU NEED?
                </h4>
                <div className="phone-detail__content-storage-options">
                  {phoneDetail.storageOptions.map((option) => (
                    <button
                      className={`phone-detail__content-storage-option ${selectedStorage === option.capacity ? '--selected' : ''}`}
                      onClick={() => {
                        setSelectedStorage(option.capacity);
                      }}
                    >
                      {option.capacity}
                    </button>
                  ))}
                </div>
              </div>
              <div className="phone-detail__content-color"></div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PhoneDetail;
