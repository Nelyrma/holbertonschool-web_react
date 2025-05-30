import React from "react";
import useLogin from "../hooks/useLogin";

function Login({ logIn, email = "", password = "" }) {
  const {
    email: emailValue,
    password: passwordValue,
    enableSubmit,
    handleChange,
    handleSubmit,
  } = useLogin(logIn, email, password);

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        name="email"
        type="email"
        value={emailValue}
        onChange={handleChange}
      />
      <label htmlFor="password">Password:</label>
      <input
        id="password"
        name="password"
        type="password"
        value={passwordValue}
        onChange={handleChange}
      />
      <input type="submit" value="OK" disabled={!enableSubmit} />
    </form>
  );
}

export default Login;
