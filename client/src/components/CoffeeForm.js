import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addOrigin } from '../actions/originsActions';

class CoffeeForm extends Component {
  state = {
    name: ''
  }

  render(){
    return (
      <div className='formContainer'>
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
    console.log(this.state);
    // prepare data to send to api
    const data = {"origin": this.state, "coffeeShopId": this.props.coffeeShopId};
    const addOrigin = this.props.addOrigin;
    // post to api
    fetch('/api/v1/origins', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(resp => resp.json())
      .then(json => {
        console.log(json);
        //TODO: add to store
        addOrigin(json.origin);
      });
    // reset state and form
    // fetch() is async, but we store the state in `const data` so this is okay
    this.setState({
      name: ''
    });
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addOrigin: origin => dispatch(addOrigin(origin))
  }
}

export default connect(null, mapDispatchToProps)(CoffeeForm);