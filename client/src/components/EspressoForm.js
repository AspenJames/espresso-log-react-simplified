import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addEspresso } from '../actions/espressosActions';

class EspressoForm extends Component {
  state = {
    dose: '',
    yield:  '',
    time: '',
    days_off_roast: '',
    notes: ''
  }

  render() {
    return (
      <div className='formContainer'>
        <form className='newEspresso' onSubmit={this.handleOnSubmit}>
          <label>Dose: </label>
          <input type='number' id='dose' value={this.state.dose}
                 onChange={this.handleOnChange} /><br />
          <label>Yield: </label>
          <input type='number' id='yield' value={this.state.yield}
                 onChange={this.handleOnChange} /><br />
          <label>Time: </label>
          <input type='number' id='time' value={this.state.time}
                 onChange={this.handleOnChange} /><br />
          <label>Days off Roast: </label>
          <input type='number' id='days_off_roast' value={this.state.days_off_roast} 
                 onChange={this.handleOnChange} /><br />
          <label>Notes: </label>
          <input type='text' id='notes' value={this.state.notes}
                 onChange={this.handleOnChange} /><br />
          <input type='submit' value='Submit Recipe' />
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
    const data = {"espresso": this.state};
    const addEspresso = this.props.addEspresso;
    // post to api
    fetch(`/api/v1/origins/${this.props.originId}/espressos`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(resp => resp.json())
      .then(json => {
        console.log(json);
        // add to redux store
        addEspresso(json.espresso);
      })
    // reset state and form
    // fetch() is async, but since we store state in `const data` this is okay
    this.setState({
      dose: '',
      yield: '',
      time: '',
      notes: ''
    });
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addEspresso: espresso => dispatch(addEspresso(espresso))
  }
}

export default connect(null, mapDispatchToProps)(EspressoForm);
