import React, { Component } from 'react';
import logo from '../caffeine.svg';
import '../App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';


import NavBar from '../components/NavBar';
import Login from '../components/Login';
import Signup from '../components/Signup';
import CoffeesContainer from './Coffees.js';
import Coffee from '../components/Coffee.js';
import Welcome from '../components/Welcome';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Espresso.Log</h1>
        </header> <br />
        <Router>
          <React.Fragment>
            <NavBar coffeeShop={this.props.coffeeShop} handleLogout={this.handleLogout} /><br />
            <Route exact path='/' component={Welcome} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/coffees' component={CoffeesContainer} />
            <Route exact path='/coffees/:id' component={Coffee} />
          </React.Fragment>
        </Router>
      </div>
    );
  }

  handleLogout = event => {
    event.preventDefault();
    // post logout request to api server
    fetch('/api/v1/logout', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp => resp.json())
      .then(json => {
        // reset redux store
        this.props.resetCoffeeShop();
        //TODO: error handling?
      })
  }
}

const mapStateToProps = state => {
  return {
    coffeeShop: state.coffeeShop
  }
}

const mapDispatchToProps = dispatch => {
  return {
    resetCoffeeShop: () => {
      dispatch({ type: '@@RESET' });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
