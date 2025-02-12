import { render, screen, fireEvent } from '@testing-library/react';
import App from '../../../App';
import { RoutePaths } from '../../../types/routes.types';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

describe('App Component', () => {
  let navigateMock: jest.Mock;

  beforeEach(() => {
    navigateMock = jest.fn();
    (require('react-router-dom').useNavigate as jest.Mock).mockReturnValue(
      navigateMock
    );
  });

  test('renders Header component', () => {
    render(<App />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  test('renders MainPage when navigating to /phone-list', () => {
    render(<App />);
    const headerLogo = screen.getByTestId('header-logo');
    fireEvent.click(headerLogo);
    expect(navigateMock).toHaveBeenCalledWith(RoutePaths.PHONE_LIST);
  });

  test('renders CartPage when navigating to /cart', () => {
    render(<App />);
    const cartIcon = screen.getByAltText('Cart');
    fireEvent.click(cartIcon);
    expect(navigateMock).toHaveBeenCalledWith('/cart');
  });
});
