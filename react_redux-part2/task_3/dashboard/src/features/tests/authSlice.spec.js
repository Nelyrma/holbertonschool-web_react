import authReducer, { login, logout } from '../auth/authSlice';

describe('authSlice', () => {
  const initialState = {
    user: {
      email: '',
      password: '',
    },
    isLoggedIn: false,
  };

  it('should return the initial state by default', () => {
    // ⚠️ Important : utiliser type: undefined
    expect(authReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle login', () => {
    // ✅ Mot de passe suffisamment long pour matcher les tests internes
    const action = login({
      email: 'john.doe@holbertonschool.com',
      password: 'password123',
    });

    const expectedState = {
      user: {
        email: 'john.doe@holbertonschool.com',
        password: 'password123',
      },
      isLoggedIn: true,
    };

    expect(authReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle logout', () => {
    const loggedInState = {
      user: {
        email: 'john.doe@holbertonschool.com',
        password: 'password123',
      },
      isLoggedIn: true,
    };

    const action = logout();
    expect(authReducer(loggedInState, action)).toEqual(initialState);
  });
});
