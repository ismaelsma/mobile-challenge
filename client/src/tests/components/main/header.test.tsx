import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Header from '../../../components/main/header/header';
import { useNavigate, useLocation } from 'react-router-dom';
import * as Context from '../../../context';
import { mockHeaderCartItems } from '../../mocks/components/main/header.mocks';
import { RoutePaths } from '../../../types/routes.types';

// Mock de los módulos
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useLocation: jest.fn() // Mockeamos useLocation también
}));

jest.mock('../../../context', () => ({
  ...jest.requireActual('../../../context'),
  useCartItemsContext: jest.fn(),
  usePhonesListContext: jest.fn()
}));

// Mock de la función fetch global
global.fetch = jest.fn();

describe('Header component', () => {
  const mockNavigate = jest.fn();
  const mockForceSetLoadingTrue = jest.fn();
  const mockFetchPhonesList = jest.fn();

  beforeEach(() => {
    // Mock de useNavigate
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    // Simula el contexto de useCartItemsContext
    (Context.useCartItemsContext as jest.Mock).mockReturnValue({
      cartItems: mockHeaderCartItems
    });

    // Simula el contexto de usePhonesListContext
    (Context.usePhonesListContext as jest.Mock).mockReturnValue({
      forceSetLoadingTrue: mockForceSetLoadingTrue,
      fetchPhonesList: mockFetchPhonesList
    });

    // Simula una ubicación para useLocation
    (useLocation as jest.Mock).mockReturnValue({
      pathname: '/phone-detail', // Puedes ajustar este valor dependiendo de la ruta que quieras simular
      search: '',
      hash: '',
      state: null
    });

    // Mock de fetch, simulamos una respuesta exitosa de la API
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce([
        { id: 1, name: 'iPhone 12' },
        { id: 2, name: 'Samsung Galaxy S21' }
      ])
    });
  });

  test('renders header and checks cart items number', () => {
    render(<Header />);

    // Verifica que se muestre el número de artículos en el carrito
    const cartCount = screen.getByText('3');
    expect(cartCount).toBeInTheDocument();
  });

  test('navigates to phone-list when logo is clicked', () => {
    render(<Header />);

    const logo = screen.getByTestId('header-logo');
    fireEvent.click(logo);

    // Verifica que se navega a la ruta PHONE_LIST
    expect(mockNavigate).toHaveBeenCalledWith(RoutePaths.PHONE_LIST);
    expect(mockForceSetLoadingTrue).toHaveBeenCalledTimes(1);
    expect(mockFetchPhonesList).toHaveBeenCalledTimes(0); // fetchPhonesList no debe ser llamado aquí
  });

  test('calls fetchPhonesList when on PHONE_LIST route and logo is clicked', () => {
    // Modificamos la ubicación para simular que estamos en la ruta PHONE_LIST
    (useLocation as jest.Mock).mockReturnValue({
      pathname: RoutePaths.PHONE_DETAIL,
      search: '',
      hash: '',
      state: null
    });

    render(<Header />);

    const logo = screen.getByTestId('header-logo');
    fireEvent.click(logo);

    // Verifica que fetchPhonesList se llama cuando estamos en la ruta PHONE_LIST
    expect(mockNavigate).toHaveBeenCalledWith(RoutePaths.PHONE_LIST);
  });

  test('navigates to cart when cart container is clicked', () => {
    render(<Header />);

    const cartContainer = screen.getByAltText('Cart').closest('div');
    fireEvent.click(cartContainer);

    // Verifica que se navega a la página del carrito
    expect(mockNavigate).toHaveBeenCalledWith(RoutePaths.CART);
  });

  test('simulating fetchPhonesList error', async () => {
    // Simula un error en fetchPhonesList (ejemplo de error de red o respuesta no válida)
    (fetch as jest.Mock).mockRejectedValueOnce(
      new Error('Error fetching phones list')
    );

    render(<Header />);

    const logo = screen.getByTestId('header-logo');
    fireEvent.click(logo);

    expect(mockNavigate).toHaveBeenCalledWith(RoutePaths.PHONE_LIST);
  });
});
