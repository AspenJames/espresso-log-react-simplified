import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { addCoffeeShop } from '../actions/coffeeShopActions';

class Signup extends Component {
  state = {
    name: '',
    address: '',
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
    const data = {"coffee_shop": this.state}
    const addCoffeeShop = this.props.addCoffeeShop;
    // post to api server
    fetch('/api/v1/coffee_shops', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(resp => resp.json())
      .then(json => {
        if (json.coffee_shop) {
          // Add to store
          addCoffeeShop(json.coffee_shop);
          // Reset state and form
          this.setState({
            name: '',
            address: '',
            email: '',
            password: ''
          });
        } else {
          document.getElementById('formErrors').innerHTML = json.errors.join(', ');
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
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup));
