import React from 'react';
import './Login.css';

class Login extends React.Component {
  render() {
    return (
      <div className="App-body">
        <p>Login to access the full dashboard</p>
        <label htmlFor="email">Email:
          <input id="email" type="email" />
        </label>
        <label htmlFor="password">Password:
          <input id="password" type="password" />
        </label>
        <button>OK</button>
      </div>
    );
  }
}

export default Login;
