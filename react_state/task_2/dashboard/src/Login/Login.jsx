import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import PropTypes from 'prop-types';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      enableSubmit: false,
    };

    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  handleLoginSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.logIn(email, password); // ✅ Login déclenché avec les valeurs de l'état
  }

  handleChangeEmail(e) {
    const email = e.target.value;
    this.setState({ email }, this.validateForm);
  }

  handleChangePassword(e) {
    const password = e.target.value;
    this.setState({ password }, this.validateForm);
  }

  validateForm = () => {
    const { email, password } = this.state;
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isValidPassword = password.length >= 8;
    this.setState({ enableSubmit: isValidEmail && isValidPassword });
  };

  render() {
    const { email, password, enableSubmit } = this.state;

    return (
      <div className={css(styles.body)}>
        <p>Login to access the full dashboard</p>
        <form onSubmit={this.handleLoginSubmit}>
          <div className={css(styles.inputGroup)}>
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={this.handleChangeEmail}
              className={css(styles.input)}
            />
          </div>
          <div className={css(styles.inputGroup)}>
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={this.handleChangePassword}
              className={css(styles.input)}
            />
          </div>
          <div className={css(styles.buttonWrapper)}>
            <input
              type="submit"
              value="OK"
              className={css(styles.button)}
              disabled={!enableSubmit}
            />
          </div>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  logIn: PropTypes.func,
};

Login.defaultProps = {
  logIn: () => {},
};

const styles = StyleSheet.create({
  body: {
    padding: '30px',
    '@media (max-width: 900px)': {
      padding: '20px',
    },
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '1em',
    '@media (max-width: 900px)': {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
  input: {
    marginLeft: '10px',
    '@media (max-width: 900px)': {
      marginLeft: '0',
      marginTop: '5px',
      width: '100%',
    },
  },
  buttonWrapper: {
    '@media (max-width: 900px)': {
      display: 'flex',
      justifyContent: 'flex-start',
    },
  },
  button: {
    marginLeft: '10px',
    '@media (max-width: 900px)': {
      marginLeft: '0',
    },
  },
});

export default Login;
