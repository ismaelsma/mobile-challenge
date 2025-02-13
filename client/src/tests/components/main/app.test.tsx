import {
  render,
  screen,
  fireEvent,
  waitFor,
  act
} from '@testing-library/react';
import App from '../../../App';
import { RoutePaths } from '../../../types/routes.types';
import * as Context from '../../../context';
import { mockHeaderCartItems } from '../../../tests/mocks/components/main/header.mocks';
import { mockPhone } from '../../../tests/mocks/components/main/phones-list.mocks';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

jest.mock('../../../context', () => ({
  ...jest.requireActual('../../../context'),
  useCartItemsContext: jest.fn(),
  usePhonesListContext: jest.fn()
}));

global.fetch = jest.fn();

describe('App Component', () => {
  let navigateMock: jest.Mock;
  const mockFetchPhonesList = jest.fn();
  const mockForceSetLoadingTrue = jest.fn();

  beforeEach(() => {
    navigateMock = jest.fn();
    (require('react-router-dom').useNavigate as jest.Mock).mockReturnValue(
      navigateMock
    );

    const mockContextValue = {
      phonesList: mockPhone,
      loading: false,
      fetchPhonesList: jest.fn(),
      prevSearch: '',
      forceSetLoadingTrue: jest.fn()
    };

    (Context.usePhonesListContext as jest.Mock).mockReturnValue(
      mockContextValue
    );

    (Context.useCartItemsContext as jest.Mock).mockReturnValue({
      cartItems: mockHeaderCartItems
    });

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce([
        { id: 1, name: 'iPhone 12' },
        { id: 2, name: 'Samsung Galaxy S21' }
      ])
    });
  });

  test('renders Header component', async () => {
    await act(async () => {
      render(<App />);
    });

    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  test('renders MainPage when navigating to /phone-list', async () => {
    await act(async () => {
      render(<App />);
    });

    const headerLogo = screen.getByTestId('header-logo');
    fireEvent.click(headerLogo);
    expect(navigateMock).toHaveBeenCalledWith(RoutePaths.PHONE_LIST);
  });

  test('renders CartPage when navigating to /cart', async () => {
    await act(async () => {
      render(<App />);
    });

    const cartIcon = screen.getByAltText('Cart');
    fireEvent.click(cartIcon);
    expect(navigateMock).toHaveBeenCalledWith('/cart');
  });

  test('calls fetchPhonesList and handles response correctly', async () => {
    await act(async () => {
      render(<App />);
    });

    await waitFor(() =>
      expect(screen.getByText('iPhone 12')).toBeInTheDocument()
    );

    expect(fetch).toHaveBeenCalledTimes(0);
  });
});
