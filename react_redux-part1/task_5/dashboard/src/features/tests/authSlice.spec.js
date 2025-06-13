// src/features/auth/authSlice.test.js
import authReducer, { login, logout } from "../auth/authSlice";

describe("authSlice", () => {
  const initialState = {
    user: {
      email: "",
      password: "",
    },
    isLoggedIn: false,
  };

  it("devrait retourner l’état initial par défaut", () => {
    expect(authReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it("devrait connecter un utilisateur avec les bonnes informations", () => {
    const actionPayload = {
      email: "antonin@example.com",
      password: "secure123",
    };

    const newState = authReducer(undefined, login(actionPayload));

    expect(newState.user.email).toBe("antonin@example.com");
    expect(newState.user.password).toBe("secure123");
    expect(newState.isLoggedIn).toBe(true);
  });

  it("devrait déconnecter un utilisateur et réinitialiser les infos", () => {
    const previousState = {
      user: {
        email: "antonin@example.com",
        password: "secure123",
      },
      isLoggedIn: true,
    };

    const newState = authReducer(previousState, logout());

    expect(newState.user.email).toBe("");
    expect(newState.user.password).toBe("");
    expect(newState.isLoggedIn).toBe(false);
  });

  it("devrait accepter un login avec email et mot de passe vides", () => {
    const payload = { email: "", password: "" };

    const newState = authReducer(undefined, login(payload));

    expect(newState.user.email).toBe("");
    expect(newState.user.password).toBe("");
    expect(newState.isLoggedIn).toBe(true);
  });

  it("devrait rester stable quand on appelle logout alors que déjà déconnecté", () => {
    const newState = authReducer(initialState, logout());

    expect(newState).toEqual(initialState);
  });

  it("devrait permettre de se connecter puis se déconnecter proprement", () => {
    const payload = {
      email: "test@galaxia.com",
      password: "galaxia42",
    };

    const stateAfterLogin = authReducer(undefined, login(payload));
    expect(stateAfterLogin.isLoggedIn).toBe(true);
    expect(stateAfterLogin.user.email).toBe("test@galaxia.com");

    const stateAfterLogout = authReducer(stateAfterLogin, logout());
    expect(stateAfterLogout.isLoggedIn).toBe(false);
    expect(stateAfterLogout.user.email).toBe("");
    expect(stateAfterLogout.user.password).toBe("");
  });
});
