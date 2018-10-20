import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { loginCoffeeShop } from '../actions/coffeeShopActions';
import { addOrigin } from '../actions/originsActions';

class Login extends Component {
  state = {
    email: '',
    password: ''
  }

  render() {
    if (this.props.coffeeShop.id !== null) {
      this.props.history.push('/coffees');
      return null;
    }
    return (
      <div className='formContainer'>
        <div id='formErrors'>{this.renderErrors()}</div>
        <form className='login' onSubmit={this.handleOnSubmit}>
          <label>Email: </label>
          <input type='text' id='email' value={this.state.email}
                 onChange={this.handleOnChange} /><br />
          <label>Password: </label>
          <input type='password' id='password' value={this.state.password}
                 onChange={this.handleOnChange} /><br />
          <input type='submit' value='Login' />
        </form>
      </div>
    )
  }

  renderErrors = () => {
    if (this.props.coffeeShop.errors !== null) {
      return this.props.coffeeShop.errors;
    }
  }

  handleOnChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleOnSubmit = event => {
    event.preventDefault();
    // Clear error div
    document.getElementById('formErrors').innerHTML = null;
    // Prepare data to send to api
    const data = {"coffee_shop": this.state};
    this.props.loginCoffeeShop(data);
    this.setState({
      password: ''
    });
  }
}

const mapStateToProps = state => {
  return {
    coffeeShop: state.coffeeShop
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginCoffeeShop: data => {
      dispatch(loginCoffeeShop(data))
    },
    addOrigin: origin => {
      dispatch(addOrigin(origin))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
