import { render, screen, fireEvent } from '@testing-library/react';
import CartPage from '../../../components/main/cart-page/cart-page';
import { useCartItemsContext, usePhonesListContext } from '../../../context';
import { useNavigate } from 'react-router-dom';
import { mockCartItems } from '../../mocks/components/main/cart-page.mocks';
import { RoutePaths } from '../../../types/routes.types';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

jest.mock('../../../context', () => ({
  ...jest.requireActual('../../../context'),
  useCartItemsContext: jest.fn(),
  usePhonesListContext: jest.fn()
}));

jest.mock('../../../components/common/notification/notification', () => ({
  __esModule: true,
  default: jest.fn(() => null)
}));

describe('CartPage component', () => {
  const mockNavigate = jest.fn();
  const mockForceSetLoadingTrue = jest.fn();
  const mockDeleteItem = jest.fn();
  const mockDeleteAll = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    (useCartItemsContext as jest.Mock).mockReturnValue({
      cartItems: mockCartItems,
      deleteItem: mockDeleteItem,
      deleteAll: mockDeleteAll
    });

    (usePhonesListContext as jest.Mock).mockReturnValue({
      forceSetLoadingTrue: mockForceSetLoadingTrue
    });
  });

  test('renders cart page and checks items', () => {
    render(<CartPage />);

    // Check if texts are rendered
    const cartTitle = screen.getByText('Cart (2)');
    expect(cartTitle).toBeInTheDocument();

    const itemPrice = screen.getByText('200 EUR (2 units)');
    expect(itemPrice).toBeInTheDocument();

    const continueShoppingButton = screen.getByTestId(
      'continue-shopping-button'
    );
    expect(continueShoppingButton).toBeInTheDocument();

    // Check if pay button is rendered
    const payButton = screen.getByTestId('pay-button');
    expect(payButton).toBeInTheDocument();
  });

  test('calculates total price correctly', () => {
    render(<CartPage />);

    // Check if price is rendered
    const totalPrice = screen.getAllByText('350 EUR')[0];
    expect(totalPrice).toBeInTheDocument();
  });

  test('navigates to phone-list when continue shopping is clicked', () => {
    render(<CartPage />);

    const continueShoppingButton = screen.getByTestId(
      'continue-shopping-button'
    );
    fireEvent.click(continueShoppingButton);

    // Check if navigate to phone-list is called
    expect(mockForceSetLoadingTrue).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(RoutePaths.PHONE_LIST);
  });

  test('deletes all items when pay button is clicked', () => {
    render(<CartPage />);

    const payButton = screen.getByTestId('pay-button');
    fireEvent.click(payButton);

    // Check if deleteAll is called
    expect(mockDeleteAll).toHaveBeenCalledTimes(1);
  });

  test('renders no items message when cart is empty', () => {
    (useCartItemsContext as jest.Mock).mockReturnValue({
      cartItems: [],
      deleteItem: mockDeleteItem,
      deleteAll: mockDeleteAll
    });

    render(<CartPage />);

    // Check if no items message is rendered
    const noItemsMessage = screen.getByText(
      'There is no available items in the cart'
    );
    expect(noItemsMessage).toBeInTheDocument();
  });

  test('calls deleteItem when delete button is clicked', () => {
    render(<CartPage />);

    const deleteButton = screen.getAllByTestId('delete-button')[0];
    fireEvent.click(deleteButton);

    // Check if delete action is triggered
    expect(mockDeleteItem).toHaveBeenCalledWith(0);
    expect(mockDeleteItem).toHaveBeenCalledTimes(1);
  });
});
