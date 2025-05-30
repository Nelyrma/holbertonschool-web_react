// src/Header/Header.jsx
import React from "react";
import logo from "../assets/holberton-logo.jpg";
import { StyleSheet, css } from "aphrodite";
import newContext from "../Context/context";

class Header extends React.Component {
  static contextType = newContext;

  render() {
    const { user, logOut } = this.context;

    return (
      <>
        <div className={css(styles.header)}>
          <img src={logo} alt="holberton logo" className={css(styles.logo)} />
          <h1 className={css(styles.title)}>School dashboard</h1>
        </div>
        {user.isLoggedIn && (
          <section id="logoutSection" className={css(styles.logoutSection)}>
            Welcome <strong>{user.email}</strong>{" "}
            <a href="#logout" onClick={logOut}>
              (logout)
            </a>
          </section>
        )}
      </>
    );
  }
}

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
  logoutSection: {
    textAlign: "right",
    paddingRight: "1rem",
    fontSize: "1rem",
    color: "#fff",
  },
});

export default Header;
