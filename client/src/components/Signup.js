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
    event.preventSubmit;
    console.log("state: ", this.state);
    //TODO: send to api
  }
}

export default Signup;