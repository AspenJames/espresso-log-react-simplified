import React from 'react';
import { NavLink } from 'react-router-dom';


const NavBar = (props) => {
  const renderUserLinks = () => {
    if (props.coffeeShop.id === null) {
      return (
        <React.Fragment>
          <NavLink to='/login' exact>Login</NavLink><span> | </span>
          <NavLink to='/signup' exact>Sign Up</NavLink>
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <a href='/disabled' onClick={props.handleLogout}>Log Out</a>
        </React.Fragment>
      )
    }
  }

  return (
    <div className='navbar'>
      <NavLink to='/' exact>Home</NavLink><span> | </span>
      {renderUserLinks()}
    </div>
  )
}

export default NavBar;
