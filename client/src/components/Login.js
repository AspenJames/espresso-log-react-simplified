import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { addCoffeeShop } from '../actions/coffeeShopActions';
import { addOrigin } from '../actions/originsActions';
import { addEspresso } from '../actions/espressosActions';

class Login extends Component {
  state = {
    email: '',
    password: ''
  }

  render() {
    return (
      <div className='formContainer'>
        <div id='formErrors' />
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

  handleOnChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleOnSubmit = event => {
    event.preventDefault();
    // Prepare data to send to api
    const data = {"coffee_shop": this.state};
    const addCoffeeShop = this.props.addCoffeeShop;
    const addOrigin = this.props.addOrigin;
    const addEspresso = this.props.addEspresso;
    fetch('/api/v1/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(resp => resp.json())
      .then(json => {
        // Update redux store with return data
        addCoffeeShop(json.coffee_shop);
        json.coffee_shop.origins.forEach(origin => addOrigin(origin));
        json.coffee_shop.espressos.forEach(esp => addEspresso(esp));
      });
    // Reset state (also resets form data)
    // fetch() is async, but since we store state in `const data`, this is fine
    this.setState({
      email: '',
      password: ''
    });
    //TODO: redirect somewhere
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addCoffeeShop: coffeeShop => {
      dispatch(addCoffeeShop(coffeeShop))
    },
    addEspresso: espresso => {
      dispatch(addEspresso(espresso))
    },
    addOrigin: origin => {
      dispatch(addOrigin(origin))
    }
  }
}

export default withRouter(connect(null, mapDispatchToProps)(Login));
