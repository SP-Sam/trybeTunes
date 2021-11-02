import React, { Component } from 'react'

import logo from '../images/trybeTunes-logo.png';
import Loading from '../components/Loading';

export default class Login extends Component {
  render() {
    const { onChange, onClick, disabled, loading } = this.props;

    return (
      <div className="login">
        {loading
          ? <Loading />
          : (
            <div className="login-page">
              <img src={ logo } alt="Logo" />
              <form className="login-form">
                <input
                  className="login-form-input"
                  placeholder="Nome de usuário"
                  type="text"
                  onChange={ onChange }
                />
                <button
                  type="button"
                  className="login-form-button"
                  onClick={ onClick }
                  disabled={ disabled }
                >
                  Entrar
                </button>
              </form>
            </div>
          )}
      </div>
    )
  }
}
