import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateEspresso, deleteEspresso } from '../actions/espressosActions';

class Espresso extends Component {

  // Get origin and espresso id from url
  originId = parseInt(this.props.location.pathname.split('/')[2], 10);
  espressoId = parseInt(this.props.location.pathname.split('/')[4], 10);

  // Grab espresso and origin from state
  espresso = this.props.espressos.find(esp => esp.id === this.espressoId);
  origin = this.props.origins.find(origin => origin.id === this.originId);

  state = {
    id: this.espresso.id,
    dose: this.espresso.dose,
    yield: this.espresso.yield,
    time: this.espresso.time,
    days_off_roast: this.espresso.days_off_roast,
    notes: this.espresso.notes
  }

  render() {
    return (
      <div>
        <h1>Manage espresso for {this.origin.name}</h1>
        <form onSubmit={this.handleSubmit} >
          <label>Dose: </label>
          <input type='number' id='dose' value={this.state.dose}
                 onChange={this.handleOnChange} /><br />
          <label>Yield: </label>
          <input type='number' id='yield' value={this.state.yield}
                 onChange={this.handleOnChange} /><br />
          <label>Time: </label>
          <input type='number' id='time' value={this.state.time}
                 onChange={this.handleOnChange} /><br />
          <label>Days off roast: </label>
          <input type='number' id='days_off_roast' value={this.state.days_off_roast}
                 onChange={this.handleOnChange} /><br />
          <label>Notes: </label>
          <input type='text' id='notes' value={this.state.notes}
                 onChange={this.handleOnChange} /><br />
          <input type='submit' value='Update Espresso' />
        </form>
        <br />
        <button onClick={() => this.handleDelete(this.espressoId)}>Delete Espresso</button><span> | </span><button onClick={this.returnToCoffee}>Back to Coffee</button>
      </div>
    );
  }

  handleOnChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    // prepare data to send to api
    const data = {"coffeeShopId": this.props.coffeeShop.id,
                  "originId": this.origin.id,
                  "espresso": this.state}
    // post to api
    fetch(`/api/v1/origins/${this.originId}/espressos/${this.espressoId}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(resp => resp.json())
      .then(json => {
        //update store with return data
        this.props.updateEspresso(json.espresso);
        // redirect back to /coffees/${originId}
        this.props.history.push(`/coffees/${this.originId}`);
      })
  }

  handleDelete = espressoId => {
    // delete espresso from server and store
    // deleteEspresso is defined in src/actions/espressosActions.js
    this.props.deleteEspresso(this.originId, espressoId);
    // redirect to coffee page
    this.props.history.push(`/coffees/${this.originId}`);
  }

  returnToCoffee = () => {
    this.props.history.push(`/coffees/${this.originId}`);
  }
}

const mapStateToProps = state => {
  return {
    coffeeShop: state.coffeeShop,
    origins: state.origins.origins,
    espressos: state.espressos.espressos
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateEspresso: espresso => {
      dispatch(updateEspresso(espresso))
    },
    deleteEspresso: (originId, espressoId) => {
      dispatch(deleteEspresso(originId, espressoId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Espresso);