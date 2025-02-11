// phones-list.test.tsx
import { act, render, screen, fireEvent, waitFor } from "@testing-library/react";
import PhonesList from "../../../components/main/phones-list/phones-list";
import { MemoryRouter, useNavigate } from "react-router-dom";
import * as Context from "../../../context"; // Importamos todo el contexto
import { mockPhones } from "../../mocks/components/main/phones-list.mocks";

// Mock para el contexto
jest.mock("../../../context", () => ({
  ...jest.requireActual("../../../context"), // Mantiene los otros contextos sin modificar
  usePhonesListContext: jest.fn(), // Mockeamos solo el hook específico
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("PhonesList", () => {
  it("debe renderizar el loader cuando está cargando", () => {
    // Mock del valor del contexto
    const mockContextValue = {
      phonesList: [],
      loading: true,
      fetchPhonesList: jest.fn(),
      prevSearch: "",
      forceSetLoadingTrue: jest.fn(),
    };

    // Mockeamos el hook
    (Context.usePhonesListContext as jest.Mock).mockReturnValue(mockContextValue);

    render(
      <MemoryRouter>
        <PhonesList />
      </MemoryRouter>,
    );

    // Comprobar si el loader está siendo renderizado
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("debe mostrar la lista de teléfonos cuando no está cargando", async () => {
    // Mock del valor del contexto
    const mockContextValue = {
      phonesList: mockPhones,
      loading: false,
      fetchPhonesList: jest.fn(),
      prevSearch: "",
      forceSetLoadingTrue: jest.fn(),
    };

    // Mockeamos el hook
    (Context.usePhonesListContext as jest.Mock).mockReturnValue(mockContextValue);

    render(
      <MemoryRouter>
        <PhonesList />
      </MemoryRouter>,
    );

    // Esperar a que los elementos estén disponibles
    await waitFor(() => expect(screen.getByText("RESULTS: 2")).toBeInTheDocument());

    // Verificar que el nombre de los teléfonos está presente en la pantalla
    expect(screen.getByText("iPhone 12")).toBeInTheDocument();
    expect(screen.getByText("Samsung Galaxy S21")).toBeInTheDocument();
  });

  it("debe actualizar el valor de la búsqueda cuando se escriba en el input", () => {
    // Mock del valor del contexto
    const mockContextValue = {
      phonesList: [],
      loading: false,
      fetchPhonesList: jest.fn(),
      prevSearch: "",
      forceSetLoadingTrue: jest.fn(),
    };

    // Mockeamos el hook
    (Context.usePhonesListContext as jest.Mock).mockReturnValue(mockContextValue);

    render(
      <MemoryRouter>
        <PhonesList />
      </MemoryRouter>,
    );

    // Simulamos la acción de escribir en el input
    const input = screen.getByPlaceholderText("Search for an smartphone");
    fireEvent.change(input, { target: { value: "iPhone" } });

    // Verificar que el valor del input se actualiza
    expect(input).toHaveValue("iPhone");
  });

  it("debe ejecutar el bloque if cuando hay un parámetro de búsqueda en la URL", async () => {
    const mockContextValue = {
      phonesList: [],
      loading: false,
      fetchPhonesList: jest.fn(),
      prevSearch: "",
      forceSetLoadingTrue: jest.fn(),
    };

    // Mockeamos el hook
    (Context.usePhonesListContext as jest.Mock).mockReturnValue(mockContextValue);

    // Simulamos la URL con el parámetro 'search'
    const searchQuery = "iphone";
    const mockLocation = {
      search: `?search=${searchQuery}`,
    };

    // Renderizamos el componente dentro de un MemoryRouter con una URL personalizada
    await act(async () => {
      render(
        <MemoryRouter initialEntries={[`/phone-list${mockLocation.search}`]}>
          <PhonesList />
        </MemoryRouter>,
      );
    });
  });

  it("debe disparar el setTimeout después de 300ms y ejecutar fetchPhonesList", async () => {
    const mockContextValue = {
      phonesList: [],
      loading: false,
      fetchPhonesList: jest.fn(),
      prevSearch: "",
      forceSetLoadingTrue: jest.fn(),
    };

    // Mock de useNavigate
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    // Mockeamos el hook
    (Context.usePhonesListContext as jest.Mock).mockReturnValue(mockContextValue);

    jest.useFakeTimers(); // Habilitamos los temporizadores falsos

    // Renderizamos el componente
    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/phone-list"]}>
          <PhonesList />
        </MemoryRouter>,
      );
    });

    // Simulamos que el usuario escribe algo en el campo de búsqueda
    const input = screen.getByPlaceholderText("Search for an smartphone");
    fireEvent.change(input, { target: { value: "iphone" } });

    // Avanzamos el temporizador de 300ms
    jest.advanceTimersByTime(300);

    // Verificamos que navigate fue llamado con la URL correcta
    expect(mockNavigate).toHaveBeenCalledWith("/phone-list?search=iphone");

    // Verificamos que fetchPhonesList fue llamada con el texto de búsqueda
    expect(mockContextValue.fetchPhonesList).toHaveBeenCalledWith("iphone");

    // Limpiamos los temporizadores después del test
    jest.useRealTimers();
  });

  it("debe disparar el setTimeout después de 300ms y ejecutar fetchPhonesList", async () => {
    const mockContextValue = {
      phonesList: [],
      loading: false,
      fetchPhonesList: jest.fn(),
      prevSearch: "",
      forceSetLoadingTrue: jest.fn(),
    };

    // Mock de useNavigate
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    // Mockeamos el hook
    (Context.usePhonesListContext as jest.Mock).mockReturnValue(mockContextValue);

    jest.useFakeTimers(); // Habilitamos los temporizadores falsos

    // Renderizamos el componente
    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/phone-list"]}>
          <PhonesList />
        </MemoryRouter>,
      );
    });

    // Simulamos que el usuario escribe algo en el campo de búsqueda
    const input = screen.getByPlaceholderText("Search for an smartphone");
    fireEvent.change(input, { target: { value: "iphone" } });

    // Avanzamos el temporizador de 300ms
    jest.advanceTimersByTime(300);

    fireEvent.change(input, { target: { value: "" } });

    // Avanzamos el temporizador de 300ms
    jest.advanceTimersByTime(300);

    // Verificamos que navigate fue llamado con la URL correcta
    expect(mockNavigate).toHaveBeenCalledWith("/phone-list?search=iphone");

    // Verificamos que fetchPhonesList fue llamada con el texto de búsqueda
    expect(mockContextValue.fetchPhonesList).toHaveBeenCalledWith("iphone");

    // Limpiamos los temporizadores después del test
    jest.useRealTimers();
  });
});
