import { useEffect, useState } from 'react';
import { useCartItemsContext, usePhonesListContext } from '../../../context';
import PhoneDetail from '../phone-detail/phone-detail';
import InputText from '../../common/input-text/input-text';
import PhoneItem from './phone-item/phone-item';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from '../../common/loader/loader';

const PhonesList = () => {
  const { fetchPhonesList } = usePhonesListContext();
  const { phonesList, loading } = usePhonesListContext();
  const [searchText, setSearchText] = useState<string>('');
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const [isFirstSearch, setIsFirstSearch] = useState<boolean>(true);
  const location = useLocation();
  const navigate = useNavigate();

  const setSearch = (text: string) => {
    setIsFirstSearch(false);
    setSearchText(text || '');
  };

  useEffect(() => {
    // Extraer el parámetro 'search' de la query string solo una vez cuando el componente se monta
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('search'); // El parámetro 'search'

    if (query) {
      setSearch(query); // Establecer el valor de la búsqueda
    }
  }, []);

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
      return;
    }
    // This function will only be triggerred if user stops typing for 0.3 seconds
    const callTimeoutDelay = setTimeout(() => {
      navigate(`/phone-list?search=${searchText}`);
      fetchPhonesList(searchText);
    }, 300);

    // This function cancels the timeout if the user retypes something before the timer is up
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
              phonesList.map((phone) => <PhoneItem {...phone} />)
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PhonesList;
