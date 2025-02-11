import { useNavigate } from 'react-router-dom';
import { useCartItemsContext, usePhonesListContext } from '../../../context';
import { ICartItemsModel } from '../../../types/cart.types';

const Header = () => {
  const { cartItems } = useCartItemsContext();
  const { forceSetLoadingTrue } = usePhonesListContext();
  const navigate = useNavigate();

  const mainMenu = () => {
    forceSetLoadingTrue();
    navigate('/phone-list');
  };

  const displayCart = () => {
    navigate('/cart');
  };

  const getCartItemsNumber = (cartItems: ICartItemsModel[]) => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="header">
      <div className="header__items">
        <div className="header__logo-container">
          <img
            src="/assets/main-logo.svg"
            alt="MBST logo"
            className="header__logo-img"
            onClick={mainMenu}
          />
        </div>
        <div className="header__cart-container" onClick={displayCart}>
          <img
            src="/assets/bag-icon.svg"
            alt="Cart"
            className="header__cart-img"
          />
          <p className="header__cart-count">{getCartItemsNumber(cartItems)}</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
