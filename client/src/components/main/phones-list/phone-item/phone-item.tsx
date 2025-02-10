import { IPhoneListItem } from '../../../../types/phone.types';
import { useNavigate } from 'react-router-dom';

const PhoneItem = (props: IPhoneListItem) => {
  const { id, name, brand, basePrice, imageUrl } = props;
  const navigate = useNavigate();

  const getPhoneLink = (phoneId: string) => {
    navigate(`/phone-detail?phoneid=${phoneId}`);
  };

  return (
    <div
      className="phone-item"
      onClick={() => {
        getPhoneLink(id);
      }}
    >
      <div className="phone-item__image">
        <img
          src={imageUrl}
          alt={`${id} image`}
          className="phone-item__image-item"
        />
      </div>
      <div className="phone-item__description">
        <div className="phone-item__description-info">
          <p className="phone-item__description-brand minor-text">{brand}</p>
          <p className="phone-item__description-model">{name}</p>
        </div>
        <div className="phone-item__description-price">
          <p className="phone-item__description-price-item">{basePrice}€</p>
        </div>
      </div>
    </div>
  );
};

export default PhoneItem;
