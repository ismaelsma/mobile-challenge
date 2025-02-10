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
import { IPhoneSpecs, IPhoneStorageOptions } from '../../../types/phone.types';
import VerticalList from '../../common/vertical-list/vertical-list';
import {
  adaptSpecsToList,
  checkContinueDisabled,
  getMinorPrice,
  getPhoneImageSrc
} from './phone-detail.functions';
import PhoneItem from '../phone-item/phone-item';

const PhoneDetail: React.FC = () => {
  const { loading, phoneDetail, fetchPhoneDetail } = usePhoneDetailContext();
  const { prevSearch, forceSetLoadingTrue } = usePhonesListContext();
  const { addItem } = useCartItemsContext();
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
      window.scrollTo(0, 0);
    } else {
      navigate(`/phone-list`);
    }
  }, [location]);

  useEffect(() => {
    if (!loading && phoneDetail.id) {
      setSelectedColor(phoneDetail.colorOptions[0].hexCode);
    }
  }, [loading]);

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
      {loading || !phoneDetail.id ? (
        <Loader />
      ) : (
        <>
          <div className="phone-detail__content">
            <div className="phone-detail__content-image">
              <img src={getPhoneImageSrc(phoneDetail, selectedColor)} />
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
                      key={option.capacity}
                      title={option.capacity}
                    >
                      {option.capacity}
                    </button>
                  ))}
                </div>
              </div>
              <div className="phone-detail__content-color">
                <h4 className="phone-detail__content-color-title">
                  COLOR. PICK YOUR FAVORITE.
                </h4>
                <div className="phone-detail__content-color-options">
                  {phoneDetail.colorOptions.map((option) => (
                    <button
                      className={`phone-detail__content-color-option ${selectedColor === option.hexCode ? '--selected' : ''}`}
                      onClick={() => {
                        setSelectedColor(option.hexCode);
                      }}
                      key={option.name}
                      title={option.name}
                      style={{ backgroundColor: option.hexCode }}
                    ></button>
                  ))}
                </div>
              </div>
              <div className="phone-detail__content-add">
                <button
                  className={`phone-detail__content-add-button ${checkContinueDisabled(selectedColor, selectedStorage) ? '--disabled' : ''}`}
                  onClick={() => {
                    addItem(phoneDetail, selectedColor, selectedStorage);
                  }}
                  disabled={checkContinueDisabled(
                    selectedColor,
                    selectedStorage
                  )}
                >
                  ADD
                </button>
              </div>
            </div>
          </div>
          <div className="phone-detail__specs">
            <h2 className="phone-detail__specs-title">SPECIFICATIONS</h2>
            <div className="phone-detail__specs-list">
              <VerticalList data={adaptSpecsToList(phoneDetail.specs)} />
            </div>
          </div>
          <div className="phone-detail__similar">
            <h2 className="phone-detail__similar-title">SIMILAR ITEMS</h2>
            <div className="phone-detail__similar-items">
              {phoneDetail.similarProducts.map((item) => (
                <PhoneItem fixWidth {...item} key={item.id} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PhoneDetail;
