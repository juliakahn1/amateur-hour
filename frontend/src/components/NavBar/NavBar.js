import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './NavBar.scss';
import { logout } from '../../store/session';

const NavBar = () => {
  const loggedIn = useSelector(state => !!state.session.user);
  const dispatch = useDispatch();

  const logoutUser = e => {
    e.preventDefault();
    dispatch(logout());
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
      <div className="navbar-wrapper">
        <h1 className="site-title">Amateur Hour</h1>
        { getLinks() }
      </div>
    </>
  )
}

export default NavBar
