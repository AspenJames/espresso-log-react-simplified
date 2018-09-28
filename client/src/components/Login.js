import React, { Component } from 'react';

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
    const data = {"coffee_shop": this.state}
    fetch('/api/v1/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(resp => resp.json())
      .then(json => {
        console.log(json);
        //TODO: update redux store
      });
  }
}

export default Login;
