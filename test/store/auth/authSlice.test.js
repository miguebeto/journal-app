import { authSlice, checkingCredentials, login, logout } from '../../../src/store/auth/authSlice';
import { authenticatedState, demoUser, initialState } from '../../fixtures/authFixtures';



describe('Pruebas en el authSlice', () => {

    test('debe regresar el estado inicial y llamarse "auth"', () => {
        // console.log(authSlice);
        const state = authSlice.reducer( initialState, {});
        // console.log(state);
        
        expect( state ).toEqual( initialState ); //se espera que el state sea igual al initialState pasado al reducer
        expect( authSlice.name ).toBe('auth'); //verifica que el nombre del slice sea el correcto

    });

    test('debe de realizar la autenticación', () => {

        const state = authSlice.reducer( initialState, login( demoUser ) );
        // console.log(state);
        expect( state ).toEqual({
            status: 'authenticated', // 'checking', 'not-authenticated', 'authenticated'
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: null,
        }); //se espera que el estado incial cambie al estado con el demouser pasado en el metodo login 
    });

    test('debe de realizar el logout sin argumentos', () => {

        // authenticatedState // logout sin argumentos
        const state = authSlice.reducer( authenticatedState, logout() );
        expect(state).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: undefined
        })
    });

    test('debe de realizar el logout y mostrar un mensaje de error', () => {

        // authenticatedState // logout con argumentos 
        const errorMessage = 'Credenciales no son correctas';

        const state = authSlice.reducer( authenticatedState, logout({ errorMessage }) );
        expect(state).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: errorMessage
        }); //se espera que se reciba el estado 'not-authenticated' y mande el errorMessage
        
    });

    test('debe de cambiar el estado a checking', () => {

        const state = authSlice.reducer( authenticatedState, checkingCredentials() );
        expect( state.status ).toBe('checking'); //se espera que el metodo cambie el estado a chenking con el metodo checkingCredentials
    });

    
});