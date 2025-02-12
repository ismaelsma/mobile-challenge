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
    // Check that loading is in the document
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Check that, after load, listItem and phone info is in the document
    await waitFor(() =>
      expect(screen.getAllByRole('listitem')).toHaveLength(3)
    );
    expect(screen.getByText('Phone 1')).toBeInTheDocument();
    expect(screen.getByText('Phone 2')).toBeInTheDocument();
    expect(screen.getByText('Phone 3')).toBeInTheDocument();

    // Check that phonelist route is called
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

    // Check that phonelist route is triggered with search text
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

    // Check that loading is in the document
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

    // Check service error
    await waitFor(() => {
      expect(consoleErrorMock).toHaveBeenCalledWith(
        'Error fetching phones list:',
        expect.any(Error)
      );
    });

    consoleErrorMock.mockRestore();
  });
});

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
    Storage.prototype.setItem = jest.fn();
    Storage.prototype.getItem = jest.fn(() => JSON.stringify([]));
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

    // Check that listitem is in the document
    await waitFor(() =>
      expect(screen.getByRole('listitem')).toBeInTheDocument()
    );

    // Check that phone is in the document
    expect(screen.getByText('Phone 1')).toBeInTheDocument();

    // Check that localStorage is updated
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'mobile-challenge:cart-items',
      JSON.stringify(cartListDataFullOneItem)
    );
  });

  test('should increment item quantity if already in the cart', async () => {
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

    // Check that phone info is loaded in the document
    await waitFor(() =>
      expect(screen.getByRole('listitem')).toBeInTheDocument()
    );
    expect(screen.getByText('Phone 1')).toBeInTheDocument();

    // Check that localStorage is updated
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'mobile-challenge:cart-items',
      JSON.stringify(cartListDataTwoQuantity)
    );
  });

  test('should delete item from the cart', async () => {
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

    // Check that localStorage is updated
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'mobile-challenge:cart-items',
      JSON.stringify([])
    );
  });

  test('should delete all items from the cart', async () => {
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

    // Check that localStorage is updated
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
  test('should provide context and update phone details', async () => {
    render(
      <PhoneDetailProvider>
        <PhoneDetailConsumer />
      </PhoneDetailProvider>
    );

    // Check loading is triggered
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText('Loaded')).toBeInTheDocument());
  });

  test('should provide context and update phone details with search', async () => {
    render(
      <PhoneDetailProvider>
        <PhoneDetailConsumer searchText="1" />
      </PhoneDetailProvider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => expect(screen.getByText('Loaded')).toBeInTheDocument());

    // Check phonelist route is called with detail queryParam
    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:3001/phonelist?detail=1'
    );
  });

  test('should call fetchPhoneDetail and update state with phone details', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(fetchPhoneDetailMock)
    });

    render(
      <PhoneDetailProvider>
        <PhoneDetailConsumer />
      </PhoneDetailProvider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByText('Phone 1')).toBeInTheDocument()
    );

    // Check phonelist route is called
    expect(fetch).toHaveBeenCalledWith('http://localhost:3001/phonelist');
  });

  test('should handle error when fetch fails', async () => {
    global.fetch = jest
      .fn()
      .mockRejectedValueOnce(new Error('Failed to fetch'));

    const consoleErrorMock = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <PhoneDetailProvider>
        <PhoneDetailConsumer />
      </PhoneDetailProvider>
    );

    await waitFor(() => expect(screen.getByText('Loaded')).toBeInTheDocument());

    expect(consoleErrorMock).toHaveBeenCalledWith(
      'Error fetching phone detail:',
      expect.any(Error)
    );

    consoleErrorMock.mockRestore();
  });

  test('should update loading state during fetch process', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(fetchPhoneDetailEmptyMock)
    });

    render(
      <PhoneDetailProvider>
        <PhoneDetailConsumer />
      </PhoneDetailProvider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByText('Phone 1')).toBeInTheDocument()
    );

    expect(screen.getByText('Loaded')).toBeInTheDocument();
  });
});
