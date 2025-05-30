import React from "react";

export const user = {
  email: "",
  password: "",
  isLoggedIn: false,
};

export const logOut = () => {};

const newContext = React.createContext({ user, logOut });

export default newContext;
