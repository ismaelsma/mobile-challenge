import { useNavigate } from 'react-router-dom';
import { useCartItemsContext, usePhonesListContext } from '../../../context';
import { ICartItemsModel } from '../../../types/cart.types';
import { RoutePaths } from '../../../types/routes.types';

const Header = () => {
  const { cartItems } = useCartItemsContext();
  const { forceSetLoadingTrue } = usePhonesListContext();
  const navigate = useNavigate();

  const mainMenu = () => {
    forceSetLoadingTrue();
    navigate(RoutePaths.PHONE_LIST);
  };

  const displayCart = () => {
    navigate(RoutePaths.CART);
  };

  const getCartItemsNumber = (cartItems: ICartItemsModel[]) => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <header className="header" role="banner">
      <div className="header__items">
        <div className="header__logo-container">
          <img
            src="/assets/main-logo.svg"
            alt="MBST logo"
            className="header__logo-img"
            onClick={mainMenu}
            data-testid="header-logo"
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
    </header>
  );
};

export default Header;
