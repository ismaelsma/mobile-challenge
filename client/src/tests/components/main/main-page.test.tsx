import { render, screen } from '@testing-library/react';
import MainPage from '../../../components/main/main-page/main-page';
import PhonesList from '../../../components/main/phones-list/phones-list';

// Mock phones-list to avoid rendering the whole component
jest.mock('../../../components/main/phones-list/phones-list', () => {
  return jest.fn(() => (
    <div data-testid="phones-list-mock">Phones List Mock</div>
  ));
});

describe('MainPage component', () => {
  test('renders MainPage and PhonesList correctly', () => {
    render(<MainPage />);

    // Check that PhonesList is in Main Page
    expect(screen.getByTestId('phones-list-mock')).toBeInTheDocument();

    const mainPageDiv = screen.getByTestId('main-page');
    expect(mainPageDiv).toBeInTheDocument();

    // Check that PhonesList is called
    expect(PhonesList).toHaveBeenCalledTimes(1);
  });
});
