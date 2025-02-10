import './styles/main.scss';
import Header from './components/main/header/header';
import MainPage from './components/main/main-page/main-page';
import {
  CartItemsProvider,
  PhoneDetailProvider,
  PhonesListProvider
} from './context';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import PhoneDetail from './components/main/phone-detail/phone-detail';

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
              <Router>
                <Routes>
                  <Route
                    key="default"
                    path="/?"
                    element={<Navigate to="/phone-list" replace />}
                  />
                  <Route
                    key="phone-list"
                    path="/phone-list"
                    element={<MainPage />}
                  />
                  <Route
                    key="phone-detail"
                    path="/phone-detail"
                    element={<PhoneDetail />}
                  />
                </Routes>
              </Router>
            </div>
          </CartItemsProvider>
        </PhoneDetailProvider>
      </PhonesListProvider>
    </div>
  );
};

export default App;
