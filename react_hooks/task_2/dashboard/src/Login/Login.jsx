import React, { useState } from "react";

function Login({
  logIn,
  email: defaultEmail = "",
  password: defaultPassword = "",
}) {
  const [formData, setFormData] = useState({
    email: defaultEmail,
    password: defaultPassword,
  });
  const [enableSubmit, setEnableSubmit] = useState(false);

  const validateForm = (email, password) => {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isValidPassword = password.length >= 8;
    setEnableSubmit(isValidEmail && isValidPassword);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    const updatedData = {
      ...formData,
      [name]: value,
    };

    setFormData(updatedData);
    validateForm(updatedData.email, updatedData.password);
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    const { email, password } = formData;
    logIn(email, password);
  };

  return (
    <form onSubmit={handleLoginSubmit}>
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
      />
      <label htmlFor="password">Password:</label>
      <input
        id="password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
      />
      <input type="submit" value="OK" disabled={!enableSubmit} />
    </form>
  );
}

export default Login;
