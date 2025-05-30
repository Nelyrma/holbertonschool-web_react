import { useState, useEffect } from "react";

function useLogin(onLogin, defaultEmail = "", defaultPassword = "") {
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState(defaultPassword);
  const [enableSubmit, setEnableSubmit] = useState(false);

  useEffect(() => {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isValidPassword = password.length >= 8;
    setEnableSubmit(isValidEmail && isValidPassword);
  }, [email, password]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(email, password);
  };

  return {
    email,
    password,
    enableSubmit,
    handleChange,
    handleSubmit,
  };
}

export default useLogin;
