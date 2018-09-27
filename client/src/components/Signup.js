import React, { Component } from 'react';

class Signup extends Component {
  state = {
    name: '',
    address: '',
    email: '',
    password: ''
  }

  render() {
    return (
      <div className='formContainer'>
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
    console.log("state: ", this.state);
    // prep data to send to api server
    const data = {"coffee_shop": this.state}
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
        console.log(json);
        //TODO: handle return data, submit to redux store
    });
    // Reset state (also resets form)
    // fetch() is async, but since we store state in const data, this is fine
    this.setState({
      name: '',
      address: '',
      email: '',
      password: ''
    });
  }
}

export default Signup;
