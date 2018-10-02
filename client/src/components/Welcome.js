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
      </ul>
    </div>
  )
}

export default Welcome;