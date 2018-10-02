import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { addCoffeeShop } from '../actions/coffeeShopActions';
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
    // Clear error div
    document.getElementById('formErrors').innerHTML = null;
    // Prepare data to send to api
    const data = {"coffee_shop": this.state};
    const addCoffeeShop = this.props.addCoffeeShop;
    const addOrigin = this.props.addOrigin;
    fetch('/api/v1/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(resp => resp.json())
      .then(json => {
        if (json.coffee_shop) {
          // Update redux store with return data
          addCoffeeShop(json.coffee_shop);
          json.coffee_shop.origins.forEach(origin => addOrigin(origin));
          // Reset state and form
          this.setState({
            email: '',
            password: ''
          });
          // Redirect to coffees page
          this.props.history.push('/coffees');
        } else {
          document.getElementById('formErrors').innerHTML = json.error;
          this.setState({
            password: ''
          });
        }
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
    addCoffeeShop: coffeeShop => {
      dispatch(addCoffeeShop(coffeeShop))
    },
    addOrigin: origin => {
      dispatch(addOrigin(origin))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
