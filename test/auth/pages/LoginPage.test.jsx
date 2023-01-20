import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";

import { LoginPage } from "../../../src/auth/pages/LoginPage";
import { authSlice } from "../../../src/store/auth";
import { startGoogleSignIn } from "../../../src/store/auth/thunk";
import { notAuthenticatedState } from "../../fixtures/authFixtures";

const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();

jest.mock("../../../src/store/auth/thunk", () => ({
  startGoogleSignIn: () => mockStartGoogleSignIn,
  startLoginWithEmailPassword: ({ email, password }) => {
    return () => mockStartLoginWithEmailPassword({ email, password });
  },
})); //mock de las funciones al interior de los thunk

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"), //para regresar todas la funciones que tiene reacr redux
  useDispatch: () => (fn) => fn(), //sobre escribe la funcion useDispatch
})); //mock de paquete react-redux

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  preloadedState: {
    auth: notAuthenticatedState, //coloca el estado como no autenticado para habilitar el boton de login
  },
});

describe("Pruebas en <LoginPage />", () => {
  beforeEach(() => jest.clearAllMocks());

  test("debe de mostrar el componente correctamente", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    // screen.debug()
    expect(screen.getAllByText("Login").length).toBeGreaterThanOrEqual(1); //se espera que el se encuentre la palabra login mas de una vez en el componente
  });

  test("boton de google debe de llamar el startGoogleSignIn", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    // console.log(store.getState()) //para ver el estado en ue se encuentra en el store antes del evento
    // screen.debug()
    const googleBtn = screen.getByLabelText("google-btn");
    fireEvent.click(googleBtn); //simula el click en el botom con la propiedad aria label en google-btn

    // console.log(store.getState()) //para ver el estado en ue se encuentra en el store luego del evento
    expect(mockStartGoogleSignIn).toHaveBeenCalled(); //se espera que el mock mockStartGoogleSignIn dentro del thunk sea llamado mediante el dispatch
  });

  test("submit debe de llamar startLoginWithEmailPassword", () => {
    const email = "fernando@google.com";
    const password = "123456";

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const emailField = screen.getByRole("textbox", { name: "Correo" }); //se toma el input del correo con el name Correo correspondiente al label interno
    fireEvent.change(emailField, { target: { name: "email", value: email } }); //se dispara el evento onchange con el target name del useform y el value email

    const passwordField = screen.getByTestId("password"); //se toma el input del password con el testid correspondiente al la propiedad testid que especificamos en el input original
    fireEvent.change(passwordField, {
      target: { name: "password", value: password },
    }); //se dispara el evento onchange con el target name del useform y el value email

    const loginForm = screen.getByLabelText("submit-form"); //toma el formulario
    fireEvent.submit(loginForm); //simulamos el evento submit

    expect(mockStartLoginWithEmailPassword).toHaveBeenCalledWith({
      email: email,
      password: password,
    }); //se espera que sea llamado con los argumentos del email y el password
  });
});
