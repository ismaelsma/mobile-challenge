import { useCartItemsContext, usePhonesListContext } from '../../../context';
import CustomButton from '../../common/custom-button/custom-button';
import { useNavigate } from 'react-router-dom';
import Notification from '../../common/notification/notification';
import { useState } from 'react';
import { RoutePaths } from '../../../types/routes.types';

const CartPage = () => {
  const { cartItems, deleteItem, deleteAll } = useCartItemsContext();
  const { forceSetLoadingTrue } = usePhonesListContext();
  const [notificationCount, setNotificationCount] = useState<number>(0);
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    forceSetLoadingTrue();
    navigate(RoutePaths.PHONE_LIST);
  };

  const handleBuy = () => {
    deleteAll();
    setNotificationCount(notificationCount + 1);
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.quantity * item.storage.price,
      0
    );
  };

  return (
    <div className="cart">
      <Notification
        text="Products purchased successfully!"
        notificationCount={notificationCount}
      />
      <div className="cart__header">
        <h1 className="cart__header-title">
          {cartItems.length
            ? `Cart (${cartItems.length})`
            : 'There is no available items in the cart'}
        </h1>
      </div>
      {cartItems.length > 0 && (
        <div className="cart__main-container">
          <div className="cart__items">
            {cartItems.map((item, index) => (
              <div
                className="cart__items-item"
                key={`${item.phoneInfo.id} - ${item.color.name} - ${item.storage.capacity}`}
              >
                <div className="cart__items-item-image">
                  <img src={item.color.imageUrl} alt={item.color.name} />
                </div>
                <div className="cart__items-item-content">
                  <div className="cart__items-item-info">
                    <p className="cart__items-item-title">
                      {item.phoneInfo.name}
                    </p>
                    <p className="cart__items-item-specs">{`${item.storage.capacity} - ${item.color.name}`}</p>
                    <p className="cart__items-item-price">
                      {`${item.storage.price * item.quantity} EUR`}
                      {item.quantity > 1 ? ` (${item.quantity} units)` : ''}
                    </p>
                  </div>
                  <div
                    className="cart__items-item-delete"
                    onClick={() => {
                      deleteItem(index);
                    }}
                  >
                    <p
                      className="cart__items-item-delete-text --red-text"
                      data-testid="delete-button"
                    >
                      DELETE
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {cartItems.length > 0 && (
            <>
              <div className="cart__buttons --desktop">
                <div className="cart__button-continue">
                  <CustomButton
                    onButtonPressed={handleContinueShopping}
                    type="white"
                    text="CONTINUE SHOPPING"
                    disabled={false}
                    testId="continue-shopping-button"
                  />
                </div>
                <div className="cart__purchase">
                  <div className="cart__purchase-text">
                    <p className="cart__purchase-total">TOTAL</p>
                    <p className="cart__purchase-price">
                      {getTotalPrice()} EUR
                    </p>
                  </div>
                  <div className="cart__purchase-button">
                    <CustomButton
                      onButtonPressed={handleBuy}
                      text="PAY"
                      disabled={false}
                      testId="pay-button"
                    />
                  </div>
                </div>
              </div>
              <div className="cart__buttons --mobile">
                <div className="cart__purchase-text">
                  <p className="cart__purchase-total">TOTAL</p>
                  <p className="cart__purchase-price">{getTotalPrice()} EUR</p>
                </div>
                <div className="cart__buttons-buttons">
                  <div className="cart__button-continue">
                    <CustomButton
                      onButtonPressed={handleContinueShopping}
                      type="white"
                      text="CONTINUE SHOPPING"
                      disabled={false}
                      testId="continue-shopping-button-mobile"
                    />
                  </div>
                  <div className="cart__purchase-button">
                    <CustomButton
                      onButtonPressed={handleBuy}
                      text="PAY"
                      disabled={false}
                      testId="pay-button-mobile"
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CartPage;
