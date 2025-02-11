import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import React from 'react';
import {
  PhonesListProvider,
  usePhonesListContext,
  CartItemsProvider,
  useCartItemsContext,
  PhoneDetailProvider,
  usePhoneDetailContext
} from '../context';
import { IPhoneDetail } from '../types/phone.types';
import {
  cartColorObject,
  cartItemObject,
  cartListDataFullOneItem,
  cartListDataOneItem,
  cartListDataTwoItems,
  cartListDataTwoQuantity,
  cartStorageObject,
  fetchPhoneDetailEmptyMock,
  fetchPhoneDetailMock,
  phoneListObject
} from './mocks/context.mocks';

const PhonesListConsumer = ({ searchText }: { searchText?: string }) => {
  const { phonesList, loading, fetchPhonesList } = usePhonesListContext();

  React.useEffect(() => {
    fetchPhonesList(searchText);
  }, [fetchPhonesList, searchText]);

  return (
    <div>
      <p>{loading ? 'Loading...' : 'Loaded'}</p>
      <ul>
        {phonesList.map((phone) => (
          <li key={phone.id} role="listitem">
            {phone.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

describe('PhonesListContext', () => {
  beforeAll(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(phoneListObject)
    }) as jest.Mock;
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('should provide context and update loading and phonesList state without search text', async () => {
    render(
      <PhonesListProvider>
        <PhonesListConsumer />
      </PhonesListProvider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getAllByRole('listitem')).toHaveLength(3)
    );

    expect(screen.getByText('Phone 1')).toBeInTheDocument();
    expect(screen.getByText('Phone 2')).toBeInTheDocument();
    expect(screen.getByText('Phone 3')).toBeInTheDocument();

    expect(fetch).toHaveBeenCalledWith('http://localhost:3001/phonelist');
  });

  test('should provide context and update loading and phonesList state with search text', async () => {
    render(
      <PhonesListProvider>
        <PhonesListConsumer searchText="text" />
      </PhonesListProvider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getAllByRole('listitem')).toHaveLength(3)
    );

    expect(screen.getByText('Phone 1')).toBeInTheDocument();
    expect(screen.getByText('Phone 2')).toBeInTheDocument();
    expect(screen.getByText('Phone 3')).toBeInTheDocument();

    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:3001/phonelist?search=text'
    );
  });

  test('should handle forceSetLoadingTrue and update loading state', async () => {
    const ForceLoadingComponent = () => {
      const { loading, forceSetLoadingTrue } = usePhonesListContext();

      React.useEffect(() => {
        forceSetLoadingTrue();
      }, [forceSetLoadingTrue]);

      return <p>{loading ? 'Loading...' : 'Loaded'}</p>;
    };

    render(
      <PhonesListProvider>
        <ForceLoadingComponent />
      </PhonesListProvider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('should handle error when fetch fails', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error('Failed to fetch')
    );

    const consoleErrorMock = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <PhonesListProvider>
        <PhonesListConsumer />
      </PhonesListProvider>
    );

    await waitFor(() => {
      expect(consoleErrorMock).toHaveBeenCalledWith(
        'Error fetching phones list:',
        expect.any(Error)
      );
    });

    consoleErrorMock.mockRestore();
  });
});

// Componente para consumir el contexto
const CartItemsConsumer = () => {
  const { cartItems, addItem, deleteItem, deleteAll } = useCartItemsContext();

  const item: IPhoneDetail = cartItemObject;
  const color = cartColorObject;
  const storage = cartStorageObject;

  return (
    <div>
      <button onClick={() => addItem(item, color, storage)}>Add Item</button>
      <button onClick={() => deleteItem(0)}>Delete Item</button>
      <button onClick={() => deleteAll()}>Delete All</button>
      <ul>
        {cartItems.map((cartItem, index) => (
          <li key={index} role="listitem">
            {cartItem.phoneInfo.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

describe('CartItemsContext', () => {
  beforeAll(() => {
    // Mock de localStorage
    Storage.prototype.setItem = jest.fn();
    Storage.prototype.getItem = jest.fn(() => JSON.stringify([])); // Empezamos con un carrito vacío
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('should add item to the cart', async () => {
    render(
      <CartItemsProvider>
        <CartItemsConsumer />
      </CartItemsProvider>
    );

    const addButton = screen.getByText('Add Item');
    fireEvent.click(addButton);

    await waitFor(() =>
      expect(screen.getByRole('listitem')).toBeInTheDocument()
    );

    expect(screen.getByText('Phone 1')).toBeInTheDocument();
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'mobile-challenge:cart-items',
      JSON.stringify(cartListDataFullOneItem)
    );
  });

  test('should increment item quantity if already in the cart', async () => {
    // Inicializamos con un artículo en el carrito
    Storage.prototype.getItem = jest.fn(() =>
      JSON.stringify(cartListDataOneItem)
    );

    render(
      <CartItemsProvider>
        <CartItemsConsumer />
      </CartItemsProvider>
    );

    const addButton = screen.getByText('Add Item');
    fireEvent.click(addButton);

    await waitFor(() =>
      expect(screen.getByRole('listitem')).toBeInTheDocument()
    );

    expect(screen.getByText('Phone 1')).toBeInTheDocument();
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'mobile-challenge:cart-items',
      JSON.stringify(cartListDataTwoQuantity)
    );
  });

  test('should delete item from the cart', async () => {
    // Inicializamos con un artículo en el carrito
    Storage.prototype.getItem = jest.fn(() =>
      JSON.stringify(cartListDataOneItem)
    );

    render(
      <CartItemsProvider>
        <CartItemsConsumer />
      </CartItemsProvider>
    );

    const deleteButton = screen.getByText('Delete Item');
    fireEvent.click(deleteButton);

    await waitFor(() => expect(screen.queryByRole('listitem')).toBeNull());

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'mobile-challenge:cart-items',
      JSON.stringify([])
    );
  });

  test('should delete all items from the cart', async () => {
    // Inicializamos con dos artículos en el carrito
    Storage.prototype.getItem = jest.fn(() =>
      JSON.stringify(cartListDataTwoItems)
    );

    render(
      <CartItemsProvider>
        <CartItemsConsumer />
      </CartItemsProvider>
    );

    const deleteAllButton = screen.getByText('Delete All');
    fireEvent.click(deleteAllButton);

    await waitFor(() =>
      expect(screen.queryAllByRole('listitem')).toHaveLength(0)
    );

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'mobile-challenge:cart-items',
      JSON.stringify([])
    );
  });
});

const PhoneDetailConsumer = ({ searchText }: { searchText?: string }) => {
  const { phoneDetail, loading, fetchPhoneDetail } = usePhoneDetailContext();

  React.useEffect(() => {
    fetchPhoneDetail(searchText);
  }, [fetchPhoneDetail]);

  return (
    <div>
      <p>{loading ? 'Loading...' : 'Loaded'}</p>
      <h1>{phoneDetail.name}</h1>
    </div>
  );
};

describe('PhoneDetailContext', () => {
  // Prueba básica de contexto y estado inicial
  test('should provide context and update phone details', async () => {
    render(
      <PhoneDetailProvider>
        <PhoneDetailConsumer />
      </PhoneDetailProvider>
    );

    // Verifica que se muestre el estado de carga inicialmente
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Espera a que los datos se carguen
    await waitFor(() => expect(screen.getByText('Loaded')).toBeInTheDocument());
  });

  test('should provide context and update phone details with search', async () => {
    render(
      <PhoneDetailProvider>
        <PhoneDetailConsumer searchText="1" />
      </PhoneDetailProvider>
    );

    // Verifica que se muestre el estado de carga inicialmente
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Espera a que los datos se carguen
    await waitFor(() => expect(screen.getByText('Loaded')).toBeInTheDocument());

    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:3001/phonelist?detail=1'
    );
  });

  // Prueba de la llamada a la API y actualización de datos
  test('should call fetchPhoneDetail and update state with phone details', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(fetchPhoneDetailMock)
    });

    render(
      <PhoneDetailProvider>
        <PhoneDetailConsumer />
      </PhoneDetailProvider>
    );

    // Verifica el estado de carga
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Espera a que los detalles del teléfono se carguen y verifica el nombre del teléfono
    await waitFor(() =>
      expect(screen.getByText('Phone 1')).toBeInTheDocument()
    );

    // Verifica que la función fetch haya sido llamada con la URL correcta
    expect(fetch).toHaveBeenCalledWith('http://localhost:3001/phonelist');
  });

  // Prueba de manejo de errores
  test('should handle error when fetch fails', async () => {
    // Simula una falla en la solicitud fetch
    global.fetch = jest
      .fn()
      .mockRejectedValueOnce(new Error('Failed to fetch'));

    // Mock de console.error para verificar si se maneja el error
    const consoleErrorMock = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <PhoneDetailProvider>
        <PhoneDetailConsumer />
      </PhoneDetailProvider>
    );

    // Espera a que el estado cambie después de la solicitud
    await waitFor(() => expect(screen.getByText('Loaded')).toBeInTheDocument());

    // Verifica que se haya registrado el error en la consola
    expect(consoleErrorMock).toHaveBeenCalledWith(
      'Error fetching phone detail:',
      expect.any(Error)
    );

    // Restauramos el mock de console.error
    consoleErrorMock.mockRestore();
  });

  // Prueba de estado `loading`
  test('should update loading state during fetch process', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(fetchPhoneDetailEmptyMock)
    });

    render(
      <PhoneDetailProvider>
        <PhoneDetailConsumer />
      </PhoneDetailProvider>
    );

    // Verifica el estado de carga inicialmente
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Espera a que el estado de carga termine y que el nombre del teléfono se muestre
    await waitFor(() =>
      expect(screen.getByText('Phone 1')).toBeInTheDocument()
    );

    // Verifica que el estado de carga haya cambiado
    expect(screen.getByText('Loaded')).toBeInTheDocument();
  });
});
