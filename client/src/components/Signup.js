import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { signupCoffeeShop } from '../actions/coffeeShopActions';

class Signup extends Component {
  state = {
    name: '',
    address: '',
    email: '',
    password: ''
  }

  componentWillUnmount() {
    this.props.resetErrors();
  }

  render() {
    if (this.props.coffeeShop.id !== null) {
      this.props.history.push('/coffees');
      return null;
    }
    return (
      <div className='formContainer'>
        <div id='formErrors'>{this.renderErrors()}</div>
        <form className='signup' onSubmit={this.handleOnSubmit}>
          <label>Coffee Shop Name: </label>
          <input type='text' id='name' value={this.state.name}
            onChange={this.handleOnChange} /><br />
          <label>Address: </label>
          <input type='text' id='address' value={this.state.address}
            onChange={this.handleOnChange} /><br />
          <label>Email: </label>
          <input type='text' id='email' value={this.state.email}
            onChange={this.handleOnChange} /><br />
          <label>Password: </label>
          <input type='password' id='password' value={this.state.password}
            onChange={this.handleOnChange} /><br />
          <input type='submit' value='Sign Up' />
        </form>
      </div>
    );
  }

  renderErrors = () => {
    if (this.props.coffeeShop.errors) {
      return this.props.coffeeShop.errors.join(', ');
    }
  }

  handleOnChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleOnSubmit = event => {
    event.preventDefault();
    // Reset error div
    document.getElementById('formErrors').innerHTML = null;
    // prep data to send to api server
    const data = { "coffee_shop": this.state }
    // post to api server
    this.props.signupCoffeeShop(data);
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
    signupCoffeeShop: (data) => {
      dispatch(signupCoffeeShop(data));
    },
    resetErrors: () => {
      dispatch({ type: "RESET_ERRORS" })
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup));
