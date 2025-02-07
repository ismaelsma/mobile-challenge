import { useCartItemsContext } from '../../../context';

const CartPage = () => {
  const { cartItems, displayCart } = useCartItemsContext();

  return (
    <div className="header">
      <div className="header__items">
        <div className="header__logo-container">
          <img
            src="/assets/main-logo.svg"
            alt="MBST logo"
            className="header__logo-img"
          />
        </div>
        <div className="header__cart-container" onClick={displayCart}>
          <img
            src="/assets/bag-icon.svg"
            alt="Cart"
            className="header__cart-img"
          />
          <p className="header__cart-count">{cartItems.length}</p>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
