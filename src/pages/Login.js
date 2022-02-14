import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends Component {
  state = {
    inputUser: '',
    loading: false,
    isUserValid: false,
  };

  loginButtonClick = async (event) => {
    event.preventDefault();
    const { inputUser } = this.state;
    this.setState({
      loading: true,
    });
    await createUser({ name: inputUser });
    this.setState({
      isUserValid: true,
    });
  };

  verifyUserLength = (text) => {
    if (text.length <= 2) return true;
  }

  render() {
    const { inputUser, loading, isUserValid } = this.state;

    return (
      <form data-testid="page-login">
        <label htmlFor="inputUser">
          Nome:
          <input
            data-testid="login-name-input"
            id="inputUser"
            type="text"
            value={ inputUser }
            onChange={ ({ target }) => this.setState({ inputUser: target.value }) }
          />
        </label>

        <button
          data-testid="login-submit-button"
          id="isLoginButtonDisabled"
          type="submit"
          onClick={ this.loginButtonClick }
          disabled={ this.verifyUserLength(inputUser) }
        >
          Entrar
        </button>

        {loading && <Loading />}
        {isUserValid && <Redirect to="/search" />}

      </form>
    );
  }
}

export default Login;
