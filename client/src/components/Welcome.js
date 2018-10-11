import React from 'react';

const Welcome = () => {
  return (
    <div>
      <h2>Welcome to Espresso.Log!</h2>
      <p>Create an account to start tracking your espresso recipes.</p>
      <h3>Notes for usage:</h3>
      <ul>
        <li>All weights are recorded in whole grams</li>
        <li>All times are recorded in whole seconds</li>
        <li>Mouse over data points to view details</li>
        <li>You may show or hide parameters in the graph by clicking on their legend</li>
        <li>Espresso recipes may be edited by clicking their point on the graph</li>
      </ul>
    </div>
  )
}

export default Welcome;