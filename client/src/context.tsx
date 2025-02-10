import React, { createContext, useState, useContext, useEffect } from 'react';
import {
  ICartItemsContext,
  IPhoneDetailContext,
  IPhoneListContext
} from './types/context.types';
import { IPhoneListItem, PhoneDetailModel } from './types/phone.types';

// MOBILE LIST API CONTEXT
const PhonesListContext = createContext<IPhoneListContext>({
  phonesList: [],
  prevSearch: '',
  loading: true,
  fetchPhonesList: async () => {}, // Función vacía como valor inicial
  forceSetLoadingTrue: () => {}
});

// Proveedor del contexto
export const PhonesListProvider = ({ children }) => {
  const [phonesList, setPhonesList] = useState<IPhoneListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [prevSearch, setPrevSearch] = useState<string>('');

  // Hacer una petición a la API (Node.js)
  const fetchPhonesList = async (searchText?: string) => {
    try {
      setLoading(true);
      if (searchText) {
        setPrevSearch(searchText);
      }
      const response = await fetch(
        `http://localhost:3001/phonelist${searchText ? `?search=${searchText}` : ''}`
      );
      const data = await response.json();
      setPhonesList(data);
    } catch (error) {
      console.error('Error fetching phones list:', error);
    } finally {
      setLoading(false);
    }
  };

  const forceSetLoadingTrue = () => {
    setLoading(true);
  };

  useEffect(() => {
    fetchPhonesList();
  }, []);

  return (
    <PhonesListContext.Provider
      value={{
        fetchPhonesList,
        phonesList,
        loading,
        prevSearch,
        forceSetLoadingTrue
      }}
    >
      {children}
    </PhonesListContext.Provider>
  );
};

export const usePhonesListContext = () => useContext(PhonesListContext);

// CART CONTEXT
const CartItemsContext = createContext<ICartItemsContext>({
  cartItems: [],
  addItem: (item: string) => {},
  deleteItem: (item: string) => {},
  displayCart: () => {},
  hideCart: () => {},
  cartDisplayed: false
});

export const CartItemsProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartDisplayed, setCartDisplayed] = useState(false);

  const addItem = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const deleteItem = (item) => {
    setCartItems((prevItems) =>
      prevItems.filter((prevItem) => prevItem.id !== item.id)
    );
  };

  const displayCart = () => {
    setCartDisplayed(true);
  };

  const hideCart = () => {
    setCartDisplayed(false);
  };

  return (
    <CartItemsContext.Provider
      value={{
        cartItems,
        addItem,
        deleteItem,
        displayCart,
        hideCart,
        cartDisplayed
      }}
    >
      {children}
    </CartItemsContext.Provider>
  );
};

export const useCartItemsContext = () => useContext(CartItemsContext);

//PHONE DETAIL
const PhoneDetailContext = createContext<IPhoneDetailContext>({
  phoneDetail: new PhoneDetailModel(),
  loading: true,
  fetchPhoneDetail: async (value: string) => {} // Función vacía como valor inicial
});

// Proveedor del contexto
export const PhoneDetailProvider = ({ children }) => {
  const [phoneDetail, setPhoneDetail] = useState(new PhoneDetailModel());
  const [loading, setLoading] = useState(false);

  // Hacer una petición a la API (Node.js)
  const fetchPhoneDetail = async (phone: string) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3001/phonelist${phone ? `?detail=${phone}` : ''}`
      );
      const data = await response.json();
      setPhoneDetail(data);
    } catch (error) {
      console.error('Error fetching phone detail:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PhoneDetailContext.Provider
      value={{ fetchPhoneDetail, phoneDetail, loading }}
    >
      {children}
    </PhoneDetailContext.Provider>
  );
};

export const usePhoneDetailContext = () => useContext(PhoneDetailContext);
