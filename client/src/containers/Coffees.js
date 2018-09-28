import React, { Component } from 'react';
import { connect } from 'react-redux';

class CoffeesContainer extends Component {
  render() {
    // redirect to root if not logged in
    if (this.props.coffeeShop.id === null){
      this.props.history.push('/');
      return null;
    } else {
      return (
        <div>{this.renderCoffees()}</div>
        //TODO: add coffee form
      )
    }
  }

  renderCoffees = () => {
    if (this.props.origins.length === 0) {
      return (
        <div>
          <p>You don't have any coffees in our system yet!</p>
          <p>Add one using the form below to start tracking your espressos.</p>
        </div>
      );
    } else {
      debugger;
      return this.props.origins.map(origin => (
        <React.Fragment>
          <li key={origin.id}><a href={'/coffees/' + origin.id}>{origin.name}</a></li>
        </React.Fragment>
      ));
    }
  }

}

const mapStateToProps = state => {
  return {
    coffeeShop: state.coffeeShop,
    espressos: state.espressos.espressos,
    origins: state.origins.origins
  }
}

export default connect(mapStateToProps)(CoffeesContainer);
