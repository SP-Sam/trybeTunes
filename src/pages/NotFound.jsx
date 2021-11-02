import React, { Component } from 'react'
import logo from '../images/trybeTunes-logo.png';

export default class NotFound extends Component {
  render() {
    return (
      <div className="not-found-page">
        <img src={ logo } alt="trybeTunes logo" />
        <h1>Pagina não encontrada!</h1>
        <p>A página que você está procurando não foi encontrada.</p>
      </div>
    )
  }
}
