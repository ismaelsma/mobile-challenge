import React, { createContext, useState, useContext, useEffect } from 'react';
import {
  ICartItemsContext,
  IPhoneDetailContext,
  IPhoneListContext
} from './types/context.types';
import {
  IPhoneColorOption,
  IPhoneDetail,
  IPhoneListItem,
  IPhoneStorageOption,
  PhoneDetailModel
} from './types/phone.types';
import { ICartItemsModel } from './types/cart.types';

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
      const uniqueItems = data.filter(
        (item, index, self) => index === self.findIndex((t) => t.id === item.id)
      );
      setPhonesList(uniqueItems.slice(0, 20));
    } catch (error) {
      console.error('Error fetching phones list:', error);
    } finally {
      setLoading(false);
    }
  };

  const forceSetLoadingTrue = () => {
    setLoading(true);
  };

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
  addItem: (
    phoneItem: IPhoneDetail,
    color: IPhoneColorOption,
    storage: IPhoneStorageOption
  ) => {},
  deleteItem: (deleteIndex: number) => {},
  cartDisplayed: false
});

export const CartItemsProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState<ICartItemsModel[]>([]);
  const [cartDisplayed, setCartDisplayed] = useState(false);

  const addItem = (
    item: IPhoneDetail,
    color: IPhoneColorOption,
    storage: IPhoneStorageOption
  ) => {
    const newItems: ICartItemsModel[] = [
      ...cartItems,
      {
        phoneInfo: item,
        color,
        storage,
        quantity: 1
      }
    ];
    setLocalStorage(newItems);
    setCartItems(newItems);
  };

  const deleteItem = (deleteIndex: number) => {
    const newItems: ICartItemsModel[] = JSON.parse(
      JSON.stringify(cartItems)
    ).filter((_, index) => index !== deleteIndex);
    setLocalStorage(newItems);
    setCartItems(newItems);
  };

  const setLocalStorage = (cartItems: ICartItemsModel[]) => {
    localStorage.setItem(
      'mobile-challenge:cart-items',
      JSON.stringify(cartItems)
    );
  };
  useEffect(() => {
    if (localStorage.getItem('mobile-challenge:cart-items')) {
      setCartItems(
        JSON.parse(localStorage.getItem('mobile-challenge:cart-items'))
      );
    }
  }, []);

  return (
    <CartItemsContext.Provider
      value={{
        cartItems,
        addItem,
        deleteItem,
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
