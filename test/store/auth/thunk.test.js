import {
  loginWithEmailPassword,
  logoutFirebase,
  singInWithGoogle,
} from "../../../src/firebase/provider";
import { checkingCredentials, login, logout } from "../../../src/store/auth";
import {
  chekingAuthentication,
  startGoogleSignIn,
  startLoginWithEmailPassword,
  startLogout,
} from "../../../src/store/auth/thunk";
import { clearNoteLogout } from "../../../src/store/journal/journalSlice";
import { demoUser } from "../../fixtures/authFixtures";

jest.mock("../../../src/firebase/provider"); //mock de las funciones en provider

describe("Pruebas en AuthThunks", () => {
  const dispatch = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test("debe invocar el checkingCredentials", async () => {
    await chekingAuthentication()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials()); //se espera que la funcion asícrona haga el dispath con la funcion del reducer
  });

  test("startGoogleSignIn debe de llamar checkingCredentials y login - Exito", async () => {
    const loginData = { ok: true, ...demoUser };
    await singInWithGoogle.mockResolvedValue(loginData);

    // thunk
    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials()); //se espera que el dispatch sea llamado con el chekingcrendential
    expect(dispatch).toHaveBeenCalledWith(login(loginData)); //se espera que el dispatch tambien sea llamado con el login(loginData)
  });

  test("startGoogleSignIn debe de llamar checkingCredentials y logout - Error", async () => {
    const loginData = { ok: false, errorMessage: "Un error en Google" };
    await singInWithGoogle.mockResolvedValue(loginData);

    // thunk
    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials()); 
    expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage)); //se espera que el dispatch sea llamado con el logout del reducer y madado el error
  });

  test("startLoginWithEmailPassword debe de llamar checkingCredentials y login - Exito", async () => {
    const loginData = { ok: true, ...demoUser };
    const formData = { email: demoUser.email, password: "123456" };

    await loginWithEmailPassword.mockResolvedValue(loginData);

    await startLoginWithEmailPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData)); //se espera que el dispath sea llamado con el login enviado en el mock
  });

  test("startLogout debe de llamar logoutFirebase, clearNotes y logout", async () => {
    await startLogout()(dispatch);

    expect(logoutFirebase).toHaveBeenCalled(); //se espera que el logout haya sido llamado
    expect(dispatch).toHaveBeenCalledWith(clearNoteLogout()); // se espera que el cleaNotesLogout haya sido llamado
    expect(dispatch).toHaveBeenCalledWith(logout()); // se espera que el logout haya sido llamado
  });
});
