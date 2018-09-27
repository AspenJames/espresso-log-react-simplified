import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import { BrowserRouter as Router, Route } from 'react-router';
import { connect } from 'react-redux';


import NavBar from '../components/NavBar';
import Login from '../components/Login';
import Signup from '../components/Signup';

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
            <NavBar /><br />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />
          </React.Fragment>
        </Router>
      </div>
    );
  }
}

export default connect(App);
