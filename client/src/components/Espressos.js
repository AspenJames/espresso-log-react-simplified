import React from 'react';

const Espressos = props => {
  return props.espressos.map(espresso => {
    return (<li key={espresso.id}><a onClick={props.handleOnClick} href={'/coffees/' + props.originId + '/espressos/' + espresso.id}>Dose: {espresso.dose} Yield: {espresso.yield} Time: {espresso.time}</a></li>)
  })
}

export default Espressos;