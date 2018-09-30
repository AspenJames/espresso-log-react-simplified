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
      return this.props.origins.map(origin => (
        <React.Fragment key={origin.id}>
          <li><a onClick={this.handleRedirect} href={'/coffees/' + origin.id}>{origin.name}</a></li>
        </React.Fragment>
      ));
    }
  }

  handleRedirect = event => {
    // redirect with react router
    event.preventDefault();
    this.props.history.push(event.target.attributes.href.value)
  }

}

const mapStateToProps = state => {
  return {
    coffeeShop: state.coffeeShop,
    origins: state.origins.origins
  }
}

export default connect(mapStateToProps)(CoffeesContainer);
