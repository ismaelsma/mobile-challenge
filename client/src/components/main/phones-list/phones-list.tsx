import { useEffect, useState } from 'react';
import { useCartItemsContext, usePhonesListContext } from '../../../context';
import PhoneDetail from '../phone-detail/phone-detail';
import { IPhonesListProps } from './phones-list.types';
import InputText from '../../common/input-text/input-text';
import PhoneItem from './phone-item/phone-item';

const PhonesList = (props: IPhonesListProps) => {
  const { fetchPhonesList } = usePhonesListContext();
  const { phonesList } = usePhonesListContext();
  const { setPhoneActive } = props;
  const [searchText, setSearchText] = useState<string>('');
  const [firstLoad, setFirstLoad] = useState<boolean>(true);

  const setSearch = (text: string) => {
    setSearchText(text || '');
  };

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
      return;
    }
    // This function will only be triggerred if user stops typing for 0.3 seconds
    const callTimeoutDelay = setTimeout(() => {
      fetchPhonesList(searchText);
    }, 300);

    // This function cancels the timeout if the user retypes something before the timer is up
    return () => clearTimeout(callTimeoutDelay);
  }, [searchText]);

  return (
    <div className="phones-list">
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
        <p className="phones-list__results-item">
          RESULTS: {phonesList.length}
        </p>
      </div>
      <div className="phones-list__phones">
        {phonesList.map((phone) => (
          <PhoneItem {...phone} key={phone.id} />
        ))}
      </div>
    </div>
  );
};

export default PhonesList;
