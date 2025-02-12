import './styles/main.scss';
import Header from './components/main/header/header';
import MainPage from './components/main/main-page/main-page';
import {
  CartItemsProvider,
  PhoneDetailProvider,
  PhonesListProvider
} from './context';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import PhoneDetail from './components/main/phone-detail/phone-detail';
import CartPage from './components/main/cart-page/cart-page';
import { RoutePaths } from './types/routes.types';

const App = () => {
  return (
    <div className="app">
      <PhonesListProvider>
        <PhoneDetailProvider>
          <CartItemsProvider>
            <Router>
              <div className="header-container">
                <Header />
              </div>
              <div className="content-container">
                <Routes>
                  <Route
                    key="not-found"
                    path={RoutePaths.NOT_FOUND}
                    element={<Navigate to={RoutePaths.PHONE_LIST} replace />}
                  />
                  <Route
                    key="default"
                    path={RoutePaths.DEFAULT}
                    element={<Navigate to={RoutePaths.PHONE_LIST} replace />}
                  />
                  <Route
                    key="phone-list"
                    path={RoutePaths.PHONE_LIST}
                    element={<MainPage />}
                  />
                  <Route
                    key="phone-detail"
                    path={RoutePaths.PHONE_DETAIL}
                    element={<PhoneDetail />}
                  />
                  <Route
                    key="cart"
                    path={RoutePaths.CART}
                    element={<CartPage />}
                  />
                </Routes>
              </div>
            </Router>
          </CartItemsProvider>
        </PhoneDetailProvider>
      </PhonesListProvider>
    </div>
  );
};

export default App;
