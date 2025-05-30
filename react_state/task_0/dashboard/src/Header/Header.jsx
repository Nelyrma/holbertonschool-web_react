import React from "react";
import logo from "../assets/holberton-logo.jpg";
import { StyleSheet, css } from "aphrodite";

const Header = () => {
  return (
    <div className={css(styles.header)}>
      <img src={logo} alt="holberton logo" className={css(styles.logo)} />
      <h1 className={css(styles.title)}>School dashboard</h1>
    </div>
  );
};

const styles = StyleSheet.create({
  header: {
    textAlign: "center",
    padding: "20px",
  },
  logo: {
    width: "150px",
  },
  title: {
    color: "white",
  },
});

export default Header;
