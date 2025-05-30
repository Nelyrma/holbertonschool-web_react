import React from "react";
import { StyleSheet, css } from "aphrodite";

class Login extends React.Component {
  render() {
    return (
      <div className={css(styles.body)}>
        <p>Login to access the full dashboard</p>
        <div className={css(styles.inputGroup)}>
          <label htmlFor="email">Email:</label>
          <input id="email" type="email" className={css(styles.input)} />
        </div>
        <div className={css(styles.inputGroup)}>
          <label htmlFor="password">Password:</label>
          <input id="password" type="password" className={css(styles.input)} />
        </div>
        <div className={css(styles.buttonWrapper)}>
          <button className={css(styles.button)}>OK</button>
        </div>
      </div>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    padding: "30px",
    "@media (max-width: 900px)": {
      padding: "20px",
    },
  },
  inputGroup: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "1em",
    "@media (max-width: 900px)": {
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
  input: {
    marginLeft: "10px",
    "@media (max-width: 900px)": {
      marginLeft: "0",
      marginTop: "5px",
      width: "100%",
    },
  },
  buttonWrapper: {
    "@media (max-width: 900px)": {
      display: "flex",
      justifyContent: "flex-start",
    },
  },
  button: {
    marginLeft: "10px",
    "@media (max-width: 900px)": {
      marginLeft: "0",
    },
  },
});

export default Login;
