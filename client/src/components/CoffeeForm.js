import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createOrigin } from '../actions/originsActions';

class CoffeeForm extends Component {
  state = {
    name: ''
  }

  render(){
    return (
      <div className='formContainer'>
        <div id='formErrors' />
        <form className='newCoffee' onSubmit={this.handleOnSubmit}>
          <label>Name: </label>
          <input type='text' id='name' value={this.state.name}
                 onChange={this.handleOnChange} /><br />
          <input type='submit' value='Add Coffee' />
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
    const errorDiv = document.getElementById('formErrors');
    // clear errors div
    errorDiv.innerHTML = null;
    if (this.state.name.length > 0) {
      // prepare data to send to api
      const data = {"origin": this.state, "coffeeShopId": this.props.coffeeShopId};
      // post to api and update store
      // createOrigin is defined in src/actions/originsActions.js
      this.props.createOrigin(data);
      // Reset state and form
      this.setState({
        name: ''
      });
    } else {
      errorDiv.innerHTML = "You must provide a name for a new coffee.";
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createOrigin: origin => dispatch(createOrigin(origin))
  }
}

export default connect(null, mapDispatchToProps)(CoffeeForm);