import { render, screen, fireEvent } from '@testing-library/react';
import PhonesList from '../../../components/main/phones-list/phones-list';
import { MemoryRouter } from 'react-router-dom';
import * as Context from '../../../context'; // Importamos Context
import { mockPhone } from '../../mocks/components/main/phones-list.mocks';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '../../../types/routes.types';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

jest.mock('../../../context', () => ({
  ...jest.requireActual('../../../context'),
  usePhonesListContext: jest.fn()
}));

describe('PhonesList', () => {
  test('should trigger onClick event successfully', () => {
    const mockContextValue = {
      phonesList: mockPhone,
      loading: false,
      fetchPhonesList: jest.fn(),
      prevSearch: '',
      forceSetLoadingTrue: jest.fn()
    };

    (Context.usePhonesListContext as jest.Mock).mockReturnValue(
      mockContextValue
    );

    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    render(
      <MemoryRouter>
        <PhonesList />
      </MemoryRouter>
    );

    const button = screen.getByTestId('phone-item');
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    // Check is redirection is successful after click event
    expect(mockNavigate).toHaveBeenCalledWith(
      `${RoutePaths.PHONE_DETAIL}?phoneid=1`
    );
  });
});
