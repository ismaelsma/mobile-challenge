import { useEffect } from 'react';
import { useCartItemsContext, usePhonesListContext } from '../../../context';
import CartPage from '../cart-page/cart-page';
import PhonesPage from '../phones-page/phones-page';

const MainPage = () => {
  const { cartDisplayed } = useCartItemsContext();
  return (
    <div className="main-page">
      {cartDisplayed ? (
        <div className="main-page__cart">
          <CartPage></CartPage>
        </div>
      ) : (
        <div className="main-page__mobile-phones">
          <PhonesPage></PhonesPage>
        </div>
      )}
    </div>
  );
};

export default MainPage;
