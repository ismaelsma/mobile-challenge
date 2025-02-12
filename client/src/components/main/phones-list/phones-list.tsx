import { useEffect, useState } from 'react';
import { usePhonesListContext } from '../../../context';
import InputText from '../../common/input-text/input-text';
import PhoneItem from '../phone-item/phone-item';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from '../../common/loader/loader';
import { RoutePaths } from '../../../types/routes.types';

const PhonesList = () => {
  const { fetchPhonesList } = usePhonesListContext();
  const { phonesList, loading } = usePhonesListContext();
  const [searchText, setSearchText] = useState<string>('');
  const [isFirstSearch, setIsFirstSearch] = useState<boolean>(true);
  const location = useLocation();
  const navigate = useNavigate();

  const setSearch = (text: string) => {
    setIsFirstSearch(false);
    setSearchText(text || '');
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('search');

    if (query) {
      setSearch(query);
    }
  }, []);

  useEffect(() => {
    const callTimeoutDelay = setTimeout(() => {
      navigate(
        `${RoutePaths.PHONE_LIST}${searchText ? `?search=${searchText}` : ''}`
      );
      fetchPhonesList(searchText);
    }, 300);

    return () => clearTimeout(callTimeoutDelay);
  }, [searchText]);

  return (
    <div className="phones-list">
      {loading && isFirstSearch ? (
        <Loader />
      ) : (
        <>
          <div className="phones-list__input-text">
            <InputText
              className="phones-list__input-text-item"
              name="phone-list-search"
              id="phone-list-search"
              value={searchText}
              onChange={setSearch}
              placeholder={'Search for an smartphone'}
              testId="phone-list-search-input"
            ></InputText>
          </div>
          <div className="phones-list__results">
            {!loading && (
              <p className="phones-list__results-item">
                RESULTS: {phonesList.length}
              </p>
            )}
          </div>
          <div className="phones-list__phones">
            {loading ? (
              <Loader />
            ) : (
              phonesList.map((phone) => <PhoneItem {...phone} key={phone.id} />)
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PhonesList;
