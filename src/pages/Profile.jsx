import React, { Component } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

export default class Profile extends Component {
  constructor() {
    super();

    this.state = {
      userInfos: {},
      isLoad: true,
    };

    this.getUserInfos = this.getUserInfos.bind(this);
  }

  componentDidMount() {
    this.getUserInfos();
  }

  getUserInfos() {
    this.setState({
      isLoad: true,
    });

    getUser().then((infos) => {
      this.setState({
        userInfos: infos,
        isLoad: false,
      });
    })
  }

  render() {
    const { userInfos, isLoad } = this.state;

    return (
      <div className="profile-page">
        {isLoad
          ? <div className="loading-profile"><Loading /></div>
          : (
            <div>
              <div className="edit">
                {userInfos.image
                  ? <img src={ userInfos.image } alt={`Imagem de ${userInfos.name}`} />
                  : <FaUserCircle className="user-img" />}
                <Link to="/profile/edit">
                  Editar perfil
                </Link>
              </div>

              <div className="profile-name">
                <h3>Nome</h3>
                <p>{userInfos.name}</p>
              </div>

              <div className="profile-email">
                <h3>E-mail</h3>
                <p>{userInfos.email
                  ? userInfos.email
                  : 'Clique em editar perfil para adicionar um email.'}</p>
              </div>
                  
              <div className="profile-description">
                <h3>Descrição</h3>
                {userInfos.description
                  ? userInfos.description
                  : 'Clique em editar perfil para adicionar uma descrição.'}  
              </div>
            </div>
          )}
      </div>
    )
  }
}
