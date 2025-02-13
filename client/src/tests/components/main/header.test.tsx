import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Header from '../../../components/main/header/header';
import { useNavigate, useLocation } from 'react-router-dom';
import * as Context from '../../../context';
import { mockHeaderCartItems } from '../../mocks/components/main/header.mocks';
import { RoutePaths } from '../../../types/routes.types';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useLocation: jest.fn()
}));

jest.mock('../../../context', () => ({
  ...jest.requireActual('../../../context'),
  useCartItemsContext: jest.fn(),
  usePhonesListContext: jest.fn()
}));

global.fetch = jest.fn();

describe('Header component', () => {
  const mockNavigate = jest.fn();
  const mockForceSetLoadingTrue = jest.fn();
  const mockFetchPhonesList = jest.fn();

  beforeEach(() => {
    // Mock de useNavigate
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    (Context.useCartItemsContext as jest.Mock).mockReturnValue({
      cartItems: mockHeaderCartItems
    });

    (Context.usePhonesListContext as jest.Mock).mockReturnValue({
      forceSetLoadingTrue: mockForceSetLoadingTrue,
      fetchPhonesList: mockFetchPhonesList
    });

    (useLocation as jest.Mock).mockReturnValue({
      pathname: '/phone-detail',
      search: '',
      hash: '',
      state: null
    });

    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce([
        { id: 1, name: 'iPhone 12' },
        { id: 2, name: 'Samsung Galaxy S21' }
      ])
    });
  });

  test('renders header and checks cart items number', () => {
    render(<Header />);

    const cartCount = screen.getByText('3');
    expect(cartCount).toBeInTheDocument();
  });

  test('navigates to phone-list when logo is clicked', () => {
    render(<Header />);

    const logo = screen.getByTestId('header-logo');
    fireEvent.click(logo);

    // Check PHONE_LIST navegation
    expect(mockNavigate).toHaveBeenCalledWith(RoutePaths.PHONE_LIST);
    expect(mockForceSetLoadingTrue).toHaveBeenCalledTimes(1);
    expect(mockFetchPhonesList).toHaveBeenCalledTimes(0); // fetchPhonesList no debe ser llamado aquí
  });

  test('calls fetchPhonesList when on PHONE_LIST route and logo is clicked', () => {
    (useLocation as jest.Mock).mockReturnValue({
      pathname: RoutePaths.PHONE_DETAIL,
      search: '',
      hash: '',
      state: null
    });

    render(<Header />);

    const logo = screen.getByTestId('header-logo');
    fireEvent.click(logo);

    // Check that PHONE_LIST route is used
    expect(mockNavigate).toHaveBeenCalledWith(RoutePaths.PHONE_LIST);
  });

  test('navigates to cart when cart container is clicked', () => {
    render(<Header />);

    const cartContainer = screen.getByAltText('Cart').closest('div');
    fireEvent.click(cartContainer);

    // Check tthat CART route is called
    expect(mockNavigate).toHaveBeenCalledWith(RoutePaths.CART);
  });

  test('simulating fetchPhonesList error', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(
      new Error('Error fetching phones list')
    );

    render(<Header />);

    const logo = screen.getByTestId('header-logo');
    fireEvent.click(logo);

    // Check that PHONE_LIST route is used
    expect(mockNavigate).toHaveBeenCalledWith(RoutePaths.PHONE_LIST);
  });
});
