import { IPhoneListItem } from '../../../../types/phone.types';

const PhoneItem = (props: IPhoneListItem) => {
  const { id, name, brand, basePrice, imageUrl } = props;

  return (
    <div className="phone-item">
      <div className="phone-item__image">
        <img
          src={imageUrl}
          alt={`${name} image`}
          className="phone-item__image-item"
        />
      </div>
      <div className="phone-item__description">
        <div className="phone-item__description-info">
          <p className="phone-item__descrition-brand minor-text">{brand}</p>
          <p className="phone-item__descrition-model">{name}</p>
        </div>
        <div className="phone-item__description-price">
          <p className="phone-item__description-price-item">{basePrice}€</p>
        </div>
      </div>
    </div>
  );
};

export default PhoneItem;
