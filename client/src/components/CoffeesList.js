import React from 'react';

// const CoffeesList = props => {
//   return props.coffees.map(coffee => {
//     return (<li key={coffee.id}><a onClick={props.handleOnClick} href={'/coffees/' + coffee.id}>{coffee.name}</a></li>)
//   });
// }

class CoffeesList extends React.Component {
  constructor(){
    super();
    this.state = {
      counter: 0
    };
  }

  incrementCounter = () => {
    this.setState((state) => ({
      counter: state.counter += 1
    }));
  }

  render(){
    return (<li key={this.props.coffee.id}><a onClick={this.props.handleOnClick} href={'/coffees/' + this.props.coffee.id}>{this.props.coffee.name}</a><button onClick={this.incrementCounter}>Upvote</button>{this.state.counter}</li>)
  }
}

export default CoffeesList