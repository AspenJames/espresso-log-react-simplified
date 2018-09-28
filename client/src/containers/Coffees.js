import React, { Component } from 'react';
import { connect } from 'react-redux';

class CoffeesContainer extends Component {
  render() {
    return (
      <div>Coffees Container</div>
    )
  }
}

const mapStateToProps = state => {
  return {
    coffeeShop: state.coffeeShop,
    espressos: state.espressos,
    origins: state.origins
  }
}

export default connect(mapStateToProps)(CoffeesContainer);
