import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchEspressos } from '../actions/espressosActions';

class Coffee extends Component {
  // Get id from url
  originId = this.props.location.pathname.split('/')[2];
  origin = this.props.origins.find(o => o.id = this.originId);
  
  componentDidMount() {
    this.props.fetchEspressos(this.originId)
  }

  render() {
    if (this.props.coffeeShop === undefined){
      // Redirect to root if not logged in
      this.props.history.push('/');
      return null;
    } else {
      return (
        <div>
          <h1>{this.origin.name}</h1>
          {/* <EspressoForm origin={this.origin} /> */}
          //TODO: Espresso chart
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
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
