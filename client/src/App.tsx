import './styles/main.scss';
import Header from './components/main/header/header';
import MainPage from './components/main/main-page/main-page';
import {
  CartItemsProvider,
  PhoneDetailProvider,
  PhonesListProvider
} from './context';
import React from 'react';

const App = () => {
  return (
    <div className="app">
      <PhonesListProvider>
        <PhoneDetailProvider>
          <CartItemsProvider>
            <div className="header-container">
              <Header />
            </div>
            <div className="content-container">
              <MainPage></MainPage>
            </div>
          </CartItemsProvider>
        </PhoneDetailProvider>
      </PhonesListProvider>
    </div>
  );
};

export default App;
