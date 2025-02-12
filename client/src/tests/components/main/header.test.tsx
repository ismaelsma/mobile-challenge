import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../../../components/main/header/header';
import { useNavigate } from 'react-router-dom';
import * as Context from '../../../context';
import { mockHeaderCartItems } from '../../mocks/components/main/header.mocks';
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

describe('Header component', () => {
  const mockNavigate = jest.fn();
  const mockForceSetLoadingTrue = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    (Context.useCartItemsContext as jest.Mock).mockReturnValue({
      cartItems: mockHeaderCartItems
    });

    (Context.usePhonesListContext as jest.Mock).mockReturnValue({
      forceSetLoadingTrue: mockForceSetLoadingTrue
    });
  });

  test('renders header and checks cart items number', () => {
    render(<Header />);

    // Check if cart items number is rendered
    const cartCount = screen.getByText('3');
    expect(cartCount).toBeInTheDocument();
  });

  test('navigates to phone-list when logo is clicked', () => {
    render(<Header />);

    const logo = screen.getByTestId('header-logo');
    fireEvent.click(logo);

    // Check if logo navigates to phone-list
    expect(mockForceSetLoadingTrue).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(RoutePaths.PHONE_LIST);
  });

  test('navigates to cart when cart container is clicked', () => {
    render(<Header />);

    const cartContainer = screen.getByAltText('Cart').closest('div');
    fireEvent.click(cartContainer);

    // Check if cart section navigates to cart page
    expect(mockNavigate).toHaveBeenCalledWith(RoutePaths.CART);
  });
});
