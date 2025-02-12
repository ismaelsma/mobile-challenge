import {
  act,
  render,
  screen,
  fireEvent,
  waitFor
} from '@testing-library/react';
import PhonesList from '../../../components/main/phones-list/phones-list';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import * as Context from '../../../context';
import { mockPhones } from '../../mocks/components/main/phones-list.mocks';
import { RoutePaths } from '../../../types/routes.types';

jest.mock('../../../context', () => ({
  ...jest.requireActual('../../../context'),
  usePhonesListContext: jest.fn()
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

describe('PhonesList', () => {
  test('should render the loader when loading', () => {
    const mockContextValue = {
      phonesList: [],
      loading: true,
      fetchPhonesList: jest.fn(),
      prevSearch: '',
      forceSetLoadingTrue: jest.fn()
    };

    (Context.usePhonesListContext as jest.Mock).mockReturnValue(
      mockContextValue
    );

    render(
      <MemoryRouter>
        <PhonesList />
      </MemoryRouter>
    );

    // Check that loader is rendered
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  test('should display the phone list when not loading', async () => {
    const mockContextValue = {
      phonesList: mockPhones,
      loading: false,
      fetchPhonesList: jest.fn(),
      prevSearch: '',
      forceSetLoadingTrue: jest.fn()
    };

    (Context.usePhonesListContext as jest.Mock).mockReturnValue(
      mockContextValue
    );

    render(
      <MemoryRouter>
        <PhonesList />
      </MemoryRouter>
    );

    // Check that page have the device results
    await waitFor(() =>
      expect(screen.getByText('RESULTS: 2')).toBeInTheDocument()
    );

    expect(screen.getByText('iPhone 12')).toBeInTheDocument();
    expect(screen.getByText('Samsung Galaxy S21')).toBeInTheDocument();
  });

  test('should update the search value when typing in the input', () => {
    const mockContextValue = {
      phonesList: [],
      loading: false,
      fetchPhonesList: jest.fn(),
      prevSearch: '',
      forceSetLoadingTrue: jest.fn()
    };

    (Context.usePhonesListContext as jest.Mock).mockReturnValue(
      mockContextValue
    );

    render(
      <MemoryRouter>
        <PhonesList />
      </MemoryRouter>
    );

    const input = screen.getByTestId('phone-list-search-input');
    fireEvent.change(input, { target: { value: 'iPhone' } });

    // Check that input value is successfully set
    expect(input).toHaveValue('iPhone');
  });

  test('should execute the if block when a search parameter is in the URL', async () => {
    const mockContextValue = {
      phonesList: [],
      loading: false,
      fetchPhonesList: jest.fn(),
      prevSearch: '',
      forceSetLoadingTrue: jest.fn()
    };

    (Context.usePhonesListContext as jest.Mock).mockReturnValue(
      mockContextValue
    );

    const searchQuery = 'iphone';
    const mockLocation = {
      search: `?search=${searchQuery}`
    };

    await act(async () => {
      render(
        <MemoryRouter
          initialEntries={[`${RoutePaths.PHONE_LIST}${mockLocation.search}`]}
        >
          <PhonesList />
        </MemoryRouter>
      );
    });

    const input = screen.getByTestId('phone-list-search-input');

    // Check that fetchPhonesList is not called
    expect(input).toHaveValue('iphone');
  });

  test('should trigger setTimeout after 300ms and execute fetchPhonesList', async () => {
    const mockContextValue = {
      phonesList: [],
      loading: false,
      fetchPhonesList: jest.fn(),
      prevSearch: '',
      forceSetLoadingTrue: jest.fn()
    };

    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    (Context.usePhonesListContext as jest.Mock).mockReturnValue(
      mockContextValue
    );

    jest.useFakeTimers();

    await act(async () => {
      render(
        <MemoryRouter initialEntries={[RoutePaths.PHONE_LIST]}>
          <PhonesList />
        </MemoryRouter>
      );
    });

    const input = screen.getByPlaceholderText('Search for an smartphone');
    fireEvent.change(input, { target: { value: 'iphone' } });

    jest.advanceTimersByTime(300);

    // Check redirection is successful and queryParam is correct
    expect(mockNavigate).toHaveBeenCalledWith(
      `${RoutePaths.PHONE_LIST}?search=iphone`
    );
    expect(mockContextValue.fetchPhonesList).toHaveBeenCalledWith('iphone');

    jest.useRealTimers();
  });

  test('should trigger setTimeout after 300ms and execute fetchPhonesList with no value', async () => {
    const mockContextValue = {
      phonesList: [],
      loading: false,
      fetchPhonesList: jest.fn(),
      prevSearch: '',
      forceSetLoadingTrue: jest.fn()
    };

    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    (Context.usePhonesListContext as jest.Mock).mockReturnValue(
      mockContextValue
    );

    jest.useFakeTimers();

    await act(async () => {
      render(
        <MemoryRouter initialEntries={[RoutePaths.PHONE_LIST]}>
          <PhonesList />
        </MemoryRouter>
      );
    });

    const input = screen.getByPlaceholderText('Search for an smartphone');
    fireEvent.change(input, { target: { value: 'iphone' } });

    jest.advanceTimersByTime(300);

    fireEvent.change(input, { target: { value: '' } });

    jest.advanceTimersByTime(300);

    fireEvent.change(input, { target: { value: 'iphone' } });

    jest.advanceTimersByTime(300);

    // Check redirection is successful and queryParam is correct
    expect(mockNavigate).toHaveBeenCalledWith(
      `${RoutePaths.PHONE_LIST}?search=iphone`
    );
    expect(mockContextValue.fetchPhonesList).toHaveBeenCalledWith('iphone');

    jest.useRealTimers();
  });
});
