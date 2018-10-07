import React from 'react';

const CoffeesList = props => {
  return props.coffees.map(coffee => {
    return (<li key={coffee.id}><a onClick={props.handleOnClick} href={'/coffees/' + coffee.id}>{coffee.name}</a></li>)
  });
}

export default CoffeesList