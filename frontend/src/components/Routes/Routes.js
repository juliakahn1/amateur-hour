import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

// prevents users from visiting login page is signed in
export const AuthRoute = ({ component: Component, path, exact }) => {
  const loggedIn = useSelector(state => !!state.session.user);

  return (
    <Route path={path} exact={exact} render={(props) => (
      !loggedIn ? ( // if no one is logged in
        <Component {...props} /> // should take them to provider index
      ) : (
        <Redirect to="/" />
      )
    )} />
  );
};

// prevents not-logged in users from accessing certain routes
export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const loggedIn = useSelector(state => !!state.session.user);

  return (
    <Route
      {...rest}
      render={props =>
        loggedIn ? (
          <Component {...props} /> // to desired component
        ) : (
          <Redirect to="/login" /> // redirect to login
        )
      }
    />
  );
};
