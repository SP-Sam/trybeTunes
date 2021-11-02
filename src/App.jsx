import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';

import { createUser } from './services/userAPI';

import Login from './pages/Login';
import Header from './components/Header';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      isLoading: false,
      isLogged: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target }) {
    const { value } = target;

    this.setState({
      userName: value,
    });
  }

  handleSubmit() {
    const { userName } = this.state;

    this.setState({
      isLoading: true,
    });

    createUser({ name: userName }).then(() => {
      this.setState({
        isLoading: false,
        isLogged: true,
      });
    });
  }

  render() {
    const { userName, isLoading, isLogged } = this.state;
    const minLength = 3;

    return (
      <Router>
        <Switch>
          <Route
              exact
              path="/"
              render={
                (props) => (
                  isLogged
                    ? (<Redirect to="/search" />)
                    : (
                      <Login
                        { ...props }
                        onChange={ this.handleChange }
                        onClick={ this.handleSubmit }
                        disabled={ userName.length < minLength }
                        loading={ isLoading }
                      />
                    ))
              }
          />

          <Route path="/search">
            <Header />
            <Search />
          </Route>

          <Route path="/album/:id">
            <Header />
            <Album />
          </Route>

          <Route path="/favorites">
            <Header />
            <Favorites />
          </Route>

          <Route exact path="/profile">
            <Header />
            <Profile />
          </Route>

          <Route path="/profile/edit">
            <Header />
            <ProfileEdit />
          </Route>

          <Route path="/*" component={ NotFound } />
        </Switch>
      </Router>
    )
  }
}
