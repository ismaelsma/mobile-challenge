import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PhoneDetail from '../../../components/main/phone-detail/phone-detail'; // Asegúrate de usar la ruta correcta
import {
  BrowserRouter as Router,
  useLocation,
  useNavigate
} from 'react-router-dom'; // Importamos useNavigate
import * as Context from '../../../context'; // Importamos todo el contexto
import {
  IPhoneColorOption,
  IPhoneStorageOption
} from '../../../types/phone.types';

// Mock de react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(), // Mock de useLocation
  useNavigate: jest.fn() // Mock de useNavigate
}));

// Mock para el contexto
jest.mock('../../../context', () => ({
  ...jest.requireActual('../../../context'), // Mantiene los otros contextos sin modificar
  usePhoneDetailContext: jest.fn(),
  usePhonesListContext: jest.fn(),
  useCartItemsContext: jest.fn()
}));

describe('PhoneDetail component', () => {
  const mockFetchPhoneDetail = jest.fn();
  const mockForceSetLoadingTrue = jest.fn();
  const mockAddItem = jest.fn();
  const mockNavigate = jest.fn(); // Mock de la función navigate

  const mockPhoneDetail = {
    id: '1',
    name: 'Phone X',
    colorOptions: [
      { hexCode: '#000000', name: 'Black', imageUrl: 'black-image.jpg' },
      { hexCode: '#FFFFFF', name: 'White', imageUrl: 'white-image.jpg' }
    ],
    storageOptions: [
      { capacity: '64GB', price: 100 },
      { capacity: '128GB', price: 150 }
    ],
    similarProducts: [{ id: '2', name: 'Phone Y', imageUrl: 'phone-y.jpg' }],
    specs: [{ title: 'Camera', value: '12MP' }]
  };

  beforeEach(() => {
    // Mock de fetchPhoneDetail para simular una llamada asíncrona exitosa
    (Context.usePhoneDetailContext as jest.Mock).mockReturnValue({
      loading: false,
      phoneDetail: mockPhoneDetail,
      fetchPhoneDetail: mockFetchPhoneDetail
    });

    (Context.usePhonesListContext as jest.Mock).mockReturnValue({
      prevSearch: 'Phone X',
      forceSetLoadingTrue: mockForceSetLoadingTrue
    });

    (Context.useCartItemsContext as jest.Mock).mockReturnValue({
      addItem: mockAddItem
    });

    // Mock de useLocation para que siempre devuelva el query con phoneid
    (useLocation as jest.Mock).mockReturnValue({
      search: '?phoneid=1'
    });

    // Mock de scrollTo para evitar el error
    window.scrollTo = jest.fn();

    // Mock de useNavigate para que siempre devuelva la función mockeada
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  test('renders phone details when data is loaded', async () => {
    // Mockeamos la llamada fetchPhoneDetail para que se ejecute de inmediato en los tests
    mockFetchPhoneDetail.mockResolvedValue(mockPhoneDetail);

    render(
      <Router>
        <PhoneDetail />
      </Router>
    );

    // Esperar a que el teléfono se renderice correctamente
    await waitFor(() =>
      expect(screen.getByText('Phone X')).toBeInTheDocument()
    );

    // Verificar que se renderizan las opciones de almacenamiento
    expect(screen.getByText('64GB')).toBeInTheDocument();
    expect(screen.getByText('128GB')).toBeInTheDocument();

    // Verificar que se renderizan las opciones de color
    expect(screen.getByTitle('Black')).toBeInTheDocument();
    expect(screen.getByTitle('White')).toBeInTheDocument();
  });

  test('enables and calls addItem when the add button is pressed', async () => {
    render(
      <Router>
        <PhoneDetail />
      </Router>
    );

    // Simula la selección de color y almacenamiento
    fireEvent.click(screen.getByTitle('Black'));
    fireEvent.click(screen.getByText('64GB'));

    // Verificar si el botón "ADD" está habilitado
    const addButton = screen.getByText('ADD');
    expect(addButton).not.toBeDisabled();

    // Simular un clic en el botón "ADD"
    fireEvent.click(addButton);

    // Verificar que addItem haya sido llamado
    expect(mockAddItem).toHaveBeenCalledTimes(1);
  });

  test('calls goBackAction when the back button is clicked', async () => {
    render(
      <Router>
        <PhoneDetail />
      </Router>
    );

    // Simular un clic en el botón de "BACK"
    fireEvent.click(screen.getByText('BACK'));

    // Verificar que forceSetLoadingTrue haya sido llamado
    expect(mockForceSetLoadingTrue).toHaveBeenCalledTimes(1);

    // Verificar que navigate haya sido llamado con la URL correcta
    expect(mockNavigate).toHaveBeenCalledWith('/phone-list?search=Phone X');
  });
  test('navigates to /phone-list when there is no phoneid in the URL', async () => {
    // Mock de useLocation para simular una URL sin el query 'phoneid'
    (useLocation as jest.Mock).mockReturnValue({
      search: '' // No hay query string con phoneid
    });

    // Simulamos la navegación para que se active el código que hace navigate('/phone-list')
    render(
      <Router>
        <PhoneDetail />
      </Router>
    );

    // Esperamos que navigate haya sido llamado con '/phone-list'
    await waitFor(() =>
      expect(mockNavigate).toHaveBeenCalledWith('/phone-list')
    );
  });
});
