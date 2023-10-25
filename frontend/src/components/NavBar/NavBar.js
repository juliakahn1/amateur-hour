import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { logout } from '../../store/session';
import { serviceCategories } from '../../constants';
import './NavBar.scss';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const NavBar = () => {
  const loggedIn = useSelector(state => !!state.session.user);
  const dispatch = useDispatch();
  const history = useHistory()

  const logoutUser = e => {
    e.preventDefault();
    dispatch(logout());
  }

  const goHome = e => {
    e.preventDefault()
    history.push('/')
  }

  const getLinks = () => {
    if (loggedIn) {
      return (
        <div className="links-nav">
          <Link className="nav-button" to={'/dashboard'}>Your Dashboard</Link>
          <Link className="nav-button" to={'/profile'}>Profile</Link>
          <button className="nav-button logout-button" onClick={logoutUser}>Logout</button>
        </div>
      );
    } else {
      return (
        <div className="links-auth">
          <Link className="nav-button" to={'/signup'}>Signup</Link>
          <Link className="nav-button" to={'/login'}>Login</Link>
        </div>
      );
    }
  }

  return (
    <>
      <div className="navbar-wrapper-outer">
        <div className="navbar-wrapper-title-session">
          <h1 className="site-title" onClick={(e) => goHome(e)}>AmateurHour</h1>
          { getLinks() }
        </div>
        <div className="navbar-service-categories">
          {serviceCategories.map((category, index) => {
            return ( // add on click here
              <div key={index} className="navbar-service-category-tile">
                {category}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default NavBar
