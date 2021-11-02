import React, { Component } from 'react'

import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import { FaUserCircle } from 'react-icons/fa';

import Loading from './Loading';
import logo from '../images/trybeTunes-logo-white.png';

export default class Header extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
    };

    this.handleUser = this.handleUser.bind(this);
  }

  componentDidMount() {
    this.handleUser();
  }

  handleUser() {
    this.setState({
      isLoading: true,
    }, async () => {
      const user = await getUser();
      const { name: userName } = user;

      this.setState({
        isLoading: false,
        userName,
      });
    });
  }

  render() {
    const { userName, isLoading } = this.state;
    
    return (
      <header>
        <div className="header">
          <img src={ logo } alt="Logo" />
          {isLoading
            ? <span className="loadingHeader"><Loading /></span>
            : (
              <Link className="user-profile-link" to="/profile">
                <span
                  className="userName-span"
                >
                  <FaUserCircle className="user-icon" />
                  <p className="userName">{userName}</p>
                </span>
              </Link>
            )
          }
        </div>
        <div className="header-links">
          <Link
            className="header-link"
            to="/search"
          >
            Pesquisa
          </Link>

          <Link
            className="header-link"
            to="/favorites"
          >
            Favoritas
          </Link>

          <Link
            className="header-link"
            to="/profile"
          >
            Perfil
          </Link>
        </div>
      </header>
    )
  }
}
