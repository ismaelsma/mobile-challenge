import { render, screen, fireEvent } from '@testing-library/react';
import PhonesList from '../../../components/main/phones-list/phones-list';
import { MemoryRouter } from 'react-router-dom';
import * as Context from '../../../context'; // Importamos todo el contexto
import { mockPhone } from '../../mocks/components/main/phones-list.mocks';

// Mock para el contexto
jest.mock('../../../context', () => ({
  ...jest.requireActual('../../../context'), // Mantiene los otros contextos sin modificar
  usePhonesListContext: jest.fn() // Mockeamos solo el hook específico
}));

describe('PhonesList', () => {
  it('debe ejecutar la función onClick correctamente', () => {
    const mockContextValue = {
      phonesList: mockPhone,
      loading: false,
      fetchPhonesList: jest.fn(),
      prevSearch: '',
      forceSetLoadingTrue: jest.fn()
    };
    // Mockeamos el hook
    (Context.usePhonesListContext as jest.Mock).mockReturnValue(
      mockContextValue
    );

    render(
      <MemoryRouter>
        <PhonesList />
      </MemoryRouter>
    );

    // Seleccionamos el botón o el elemento que tiene el onClick
    const button = screen.getByTestId('phone-item'); // Cambiar según el botón que tiene onClick
    expect(button).toBeInTheDocument();

    // Simulamos el clic en el botón
    fireEvent.click(button);
  });
});
