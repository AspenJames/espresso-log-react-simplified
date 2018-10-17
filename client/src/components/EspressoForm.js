import React, { Component } from 'react';
import { connect } from 'react-redux';

import { postEspresso } from '../actions/espressosActions';

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
        <div id='formErrors'>{this.renderErrors()}</div>
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

  renderErrors = () => {
      if (this.props.errors) {
          return this.props.errors.join(', ');
      }
  }

  handleOnChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleOnSubmit = event => {
    event.preventDefault();
    // prepare data to send to api
    // we aren't using thunk to dispatch so we can preserve error messages
    const data = {"espresso": this.state};
    // post to api
    this.props.postEspresso(this.props.originId, data);
    this.setState({
        dose: '',
        yield: '',
        time: '',
        days_off_roast: '',
        notes: ''
    });
  }
}

const mapStateToProps = state => {
    return {
        errors: state.espressos.error
    }
}

const mapDispatchToProps = dispatch => {
  return {
    postEspresso: (originId, data) => dispatch(postEspresso(originId, data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EspressoForm);
