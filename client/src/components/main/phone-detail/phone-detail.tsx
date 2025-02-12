import {
  useCartItemsContext,
  usePhoneDetailContext,
  usePhonesListContext
} from '../../../context';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from '../../common/loader/loader';
import {
  IPhoneColorOption,
  IPhoneStorageOption
} from '../../../types/phone.types';
import VerticalList from '../../common/vertical-list/vertical-list';
import { checkContinueDisabled, getMinorPrice } from './phone-detail.functions';
import PhoneItem from '../phone-item/phone-item';
import Notification from '../../common/notification/notification';
import CustomButton from '../../common/custom-button/custom-button';
import { RoutePaths } from '../../../types/routes.types';

const PhoneDetail: React.FC = () => {
  const { loading, phoneDetail, fetchPhoneDetail } = usePhoneDetailContext();
  const { prevSearch, forceSetLoadingTrue } = usePhonesListContext();
  const { addItem } = useCartItemsContext();
  const [notificationCount, setNotificationCount] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState<IPhoneColorOption>({
    hexCode: '',
    name: '',
    imageUrl: ''
  });
  const [selectedStorage, setSelectedStorage] = useState<IPhoneStorageOption>({
    price: 0,
    capacity: ''
  });
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
      navigate(RoutePaths.PHONE_LIST);
    }
  }, [location]);

  useEffect(() => {
    if (!loading && phoneDetail.id) {
      setSelectedColor(phoneDetail.colorOptions[0]);
    }
  }, [loading]);

  const goBackAction = () => {
    const navigateUrl = `${RoutePaths.PHONE_LIST}${prevSearch ? `?search=${prevSearch}` : ''}`;
    forceSetLoadingTrue();
    navigate(navigateUrl);
  };

  return (
    <div className="phone-detail">
      <Notification
        text={'Item added to cart!'}
        notificationCount={notificationCount}
      />
      <div className="phone-detail__return" onClick={goBackAction}>
        <img
          src="/assets/back-arrow.svg"
          alt="Go back logo"
          className="phone-detail__return-img back-arrow-img"
        />
        <p className="phone-detail__return-text" data-testid="back-button">
          BACK
        </p>
      </div>
      {loading || !phoneDetail.id ? (
        <Loader />
      ) : (
        <>
          <div className="phone-detail__content">
            <div className="phone-detail__content-image">
              <img
                src={selectedColor.imageUrl || null}
                alt={selectedColor.name}
              />
            </div>
            <div className="phone-detail__content-mainspecs">
              <div className="phone-detail__content-titles">
                <h1 className="phone-detail__content-titles-name">
                  {phoneDetail.name}
                </h1>
                <h2 className="phone-detail__content-titles-lowerprice">
                  {`${selectedStorage.price || `From ${getMinorPrice(phoneDetail.storageOptions)}`} EUR`}
                </h2>
              </div>
              <div className="phone-detail__content-storage">
                <h4 className="phone-detail__content-storage-title">
                  STORAGE. HOW MUCH SPACE DO YOU NEED?
                </h4>
                <div className="phone-detail__content-storage-options">
                  {phoneDetail.storageOptions.map((option) => (
                    <button
                      className={`phone-detail__content-storage-option ${selectedStorage.capacity === option.capacity ? '--selected' : ''}`}
                      onClick={() => {
                        setSelectedStorage(option);
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
                      className={`phone-detail__content-color-option ${selectedColor?.name === option.name ? '--selected' : ''}`}
                      onClick={() => {
                        setSelectedColor(option);
                      }}
                      key={option.name}
                      title={option.name}
                      style={{ backgroundColor: option.hexCode }}
                    ></button>
                  ))}
                </div>
                {selectedColor.name !== '' && (
                  <p className="phone-detail__content-color-name">
                    {selectedColor.name}
                  </p>
                )}
              </div>
              <div className="phone-detail__content-add">
                <CustomButton
                  onButtonPressed={() => {
                    setNotificationCount(notificationCount + 1);
                    addItem(phoneDetail, selectedColor, selectedStorage);
                  }}
                  disabled={checkContinueDisabled(
                    selectedColor,
                    selectedStorage
                  )}
                  text="ADD"
                />
              </div>
            </div>
          </div>
          <div className="phone-detail__specs">
            <h2 className="phone-detail__specs-title">SPECIFICATIONS</h2>
            <div className="phone-detail__specs-list">
              <VerticalList data={phoneDetail.specs} />
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
