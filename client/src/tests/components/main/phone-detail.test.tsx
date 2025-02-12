import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PhoneDetail from '../../../components/main/phone-detail/phone-detail';
import {
  BrowserRouter as Router,
  useLocation,
  useNavigate
} from 'react-router-dom';
import * as Context from '../../../context';
import { mockPhoneDetail } from '../../mocks/components/main/phone-detail.mocks';
import { RoutePaths } from '../../../types/routes.types';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
  useNavigate: jest.fn()
}));

jest.mock('../../../context', () => ({
  ...jest.requireActual('../../../context'),
  usePhoneDetailContext: jest.fn(),
  usePhonesListContext: jest.fn(),
  useCartItemsContext: jest.fn()
}));

describe('PhoneDetail component', () => {
  const mockFetchPhoneDetail = jest.fn();
  const mockForceSetLoadingTrue = jest.fn();
  const mockAddItem = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
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

    (useLocation as jest.Mock).mockReturnValue({
      search: '?phoneid=1'
    });

    window.scrollTo = jest.fn();

    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  test('renders phone details when data is loaded', async () => {
    mockFetchPhoneDetail.mockResolvedValue(mockPhoneDetail);

    render(
      <Router>
        <PhoneDetail />
      </Router>
    );

    // Check that all phone details are in the document
    await waitFor(() =>
      expect(screen.getByText('Phone X')).toBeInTheDocument()
    );

    expect(screen.getByText('64GB')).toBeInTheDocument();
    expect(screen.getByText('128GB')).toBeInTheDocument();

    expect(screen.getByTitle('Black')).toBeInTheDocument();
    expect(screen.getByTitle('White')).toBeInTheDocument();
  });

  test('enables and calls addItem when the add button is pressed', async () => {
    render(
      <Router>
        <PhoneDetail />
      </Router>
    );

    fireEvent.click(screen.getByTitle('Black'));
    fireEvent.click(screen.getByText('64GB'));

    const addButton = screen.getByText('ADD');

    // Check that addButton is enabled
    expect(addButton).not.toBeDisabled();

    fireEvent.click(addButton);

    // Check that mockAddItem is called once
    expect(mockAddItem).toHaveBeenCalledTimes(1);
  });

  test('calls goBackAction when the back button is clicked', async () => {
    render(
      <Router>
        <PhoneDetail />
      </Router>
    );

    fireEvent.click(screen.getByTestId('back-button'));

    // Check that redirect is triggered and phone-list URL called
    expect(mockForceSetLoadingTrue).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(
      `${RoutePaths.PHONE_LIST}?search=Phone X`
    );
  });
  test('navigates to /phone-list when there is no phoneid in the URL', async () => {
    (useLocation as jest.Mock).mockReturnValue({
      search: ''
    });

    render(
      <Router>
        <PhoneDetail />
      </Router>
    );

    // Check that phone-list URL is called
    await waitFor(() =>
      expect(mockNavigate).toHaveBeenCalledWith(RoutePaths.PHONE_LIST)
    );
  });

  test('displays loading spinner when loading is true', async () => {
    (Context.usePhoneDetailContext as jest.Mock).mockReturnValue({
      loading: true,
      phoneDetail: {},
      fetchPhoneDetail: mockFetchPhoneDetail
    });

    render(
      <Router>
        <PhoneDetail />
      </Router>
    );

    // Check that loader is triggered once API is called
    await waitFor(() =>
      expect(screen.getByTestId('loader')).toBeInTheDocument()
    );
  });

  test('does not render phone details if phoneDetail is missing', async () => {
    (Context.usePhoneDetailContext as jest.Mock).mockReturnValue({
      loading: false,
      phoneDetail: {},
      fetchPhoneDetail: mockFetchPhoneDetail
    });

    render(
      <Router>
        <PhoneDetail />
      </Router>
    );

    // Check that phone info is not in the document and loader in the screen
    await waitFor(() =>
      expect(screen.queryByText('Phone X')).not.toBeInTheDocument()
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  test('calls navigate with prevSearch query when prevSearch is defined', async () => {
    (Context.usePhonesListContext as jest.Mock).mockReturnValue({
      forceSetLoadingTrue: mockForceSetLoadingTrue
    });

    render(
      <Router>
        <PhoneDetail />
      </Router>
    );

    fireEvent.click(screen.getByTestId('back-button'));

    // Check that URL is changed when triggered click event to back button
    expect(mockNavigate).toHaveBeenCalledWith(
      `${RoutePaths.PHONE_LIST}?search=Phone X`
    );
  });
});
