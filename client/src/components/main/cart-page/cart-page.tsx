import { useCartItemsContext } from '../../../context';

const CartPage = () => {
  const { cartItems, deleteItem } = useCartItemsContext();

  return (
    <div className="cart">
      <div className="cart__header">
        <h1 className="cart__header-title">
          `$
          {cartItems.length
            ? `Cart (${cartItems.length})`
            : 'There is no available items'}
          `
        </h1>
      </div>
      {cartItems.length && (
        <div className="cart__items">
          {cartItems.map((item, index) => (
            <div
              className="cart__items-item"
              key={`${item.phoneInfo.id} - ${item.color} - ${item.storage}`}
            >
              <div className="cart__items-item-image">
                <img src={item.color.imageUrl} />
              </div>
              <div className="cart__items-item-content">
                <div className="cart__items-item-info">
                  <p className="cart__items-item-title">
                    {item.phoneInfo.name}
                  </p>
                  <p className="cart__items-item-specs">{`${item.storage.capacity} - ${item.color.name}`}</p>
                  <p className="cart__items-item-price">{`${item.phoneInfo.basePrice} EUR`}</p>
                </div>
                <div
                  className="cart__items-item-delete"
                  onClick={() => {
                    deleteItem(index);
                  }}
                >
                  <p className="cart__items-item-delete-text --red-text">
                    DELETE
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartPage;
