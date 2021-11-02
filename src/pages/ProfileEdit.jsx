import React, { Component } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import { createUser } from '../services/userAPI';

export default class ProfileEdit extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      image: '',
      description: '',
    }

    this.saveUserInfos = this.saveUserInfos.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }

  saveUserInfos() {
    const { name, email, image, description } = this.state;

    createUser({
      name,
      email,
      image,
      description,
    })
  }

  render() {
    const { image, name } = this.state;

    return (
      <div className="profile-edit-page">
        <form action="" className="edit-form">
          <label htmlFor="image-edit" className="image-edit">
            {image
              ? <img src={ image } alt={`Imagem de ${name}`} />
              : <FaUserCircle className="user-img" />}
            <input
              type="text"
              name="image"
              id="image-edit"
              placeholder="insira um link para uma imagem"
              className="image-profile-edit"
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="name-edit" className="name-edit">
            <h3>Nome</h3>
            <p><i>Fique a vontade para usar seu nome social</i></p>
            <input
              type="text"
              name="name"
              id="name-edit"
              placeholder="Digite seu nome de usuário"
              className="name-profile-edit"
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="email-edit" className="email-edit">
            <h3>E-mail</h3>
            <p><i>Escolha um e-mail que consulte diariamente</i></p>
            <input
              type="text"
              name="email"
              id="email-edit"
              placeholder="usuario@usuario.com.br"
              className="email-profile-edit"
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="desc-edit" className="desc-edit">
            <h3>Descrição</h3>
            <textarea
              id="desc-edit"
              name="description"
              cols="30"
              rows="10"
              placeholder="Sobre mim"
              onChange={ this.handleChange }
            />
          </label>

          <Link to="/profile" className="save-profile-button">
            <button
              type="button"
              className="save-profile-button"
              onClick={ this.saveUserInfos }
            >
                Salvar
            </button>
          </Link>

        </form>
      </div>
    )
  }
}
