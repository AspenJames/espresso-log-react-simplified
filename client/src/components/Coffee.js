import React, { Component } from 'react';
import { connect } from 'react-redux';

import EspressoForm from './EspressoForm';
import { fetchEspressos } from '../actions/espressosActions';

class Coffee extends Component {
  // Get id from url
  originId = this.props.location.pathname.split('/')[2];
  origin = this.props.origins.find(o => o.id = this.originId);
  
  componentDidMount() {
    this.props.fetchEspressos(this.originId)
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
          <EspressoForm />
        {/* //TODO: Espresso chart */}
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
