import React, { Component } from 'react';
import { connect } from 'react-redux';

import EspressoForm from './EspressoForm';
import EspressoChart from './EspressoChart';
import { fetchEspressos } from '../actions/espressosActions';

class Coffee extends Component {

  state = {
    limit: 10
  };

  // Get id from url
  originId = this.props.location.pathname.split('/')[2];
  origin = this.props.origins.find(o => o.id === parseInt(this.originId, 10));
  
  componentDidMount() {
    this.props.fetchEspressos(this.originId)
  }

  handleOnChange = event => {
    this.setState({
      limit: event.target.value
    });
  }

  render() {
    if (this.props.coffeeShop.id === undefined || this.props.origins.length ===0){
      // Redirect to root if not logged in
      this.props.history.push('/');
      return null;
    } else {
      return (
        <div>
          <h1>{this.origin.name}</h1>
          <EspressoForm originId={this.originId}/><br />
          <label>Number of espressos to graph: </label>
          <input type='number' onChange={this.handleOnChange} value={this.state.limit} />
          <br />
          <EspressoChart limit={this.state.limit} espressos={this.props.espressos} />
        </div>
      );
    }
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
    fetchEspressos: originId => {
      dispatch(fetchEspressos(originId))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Coffee);
