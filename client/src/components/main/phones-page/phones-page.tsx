import { useState } from 'react';
import PhoneDetail from '../phone-detail/phone-detail';
import PhonesList from '../phones-list/phones-list';

const PhonesPage = () => {
  const [phoneActive, setPhoneActive] = useState<string>('');

  return (
    <div className="phones-page">
      {phoneActive ? (
        <PhoneDetail phone={phoneActive} />
      ) : (
        <PhonesList setPhoneActive={setPhoneActive}></PhonesList>
      )}
    </div>
  );
};

export default PhonesPage;
