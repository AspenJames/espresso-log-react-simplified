import React, { Component } from 'react';

// import { addEspresso } from '../actions/espressosActions';

class EspressoForm extends Component {
  state = {
    dose: '',
    yield:  '',
    time: '',
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
  }
}

export default EspressoForm;
