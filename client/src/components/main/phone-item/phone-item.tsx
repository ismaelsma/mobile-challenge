import { IPhoneListItem } from '../../../types/phone.types';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '../../../types/routes.types';

const PhoneItem = (props: IPhoneListItem & { fixWidth?: boolean }) => {
  const { id, name, brand, basePrice, imageUrl, fixWidth } = props;
  const navigate = useNavigate();

  const getPhoneLink = (phoneId: string) => {
    navigate(`${RoutePaths.PHONE_DETAIL}?phoneid=${phoneId}`);
  };

  return (
    <div
      className={`phone-item ${fixWidth ? '--fix-size' : ''}`}
      onClick={() => {
        getPhoneLink(id);
      }}
      data-testid="phone-item"
    >
      <div className="phone-item__image">
        <img src={imageUrl} alt={`${id}`} className="phone-item__image-item" />
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
