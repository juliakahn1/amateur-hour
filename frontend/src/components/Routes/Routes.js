import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

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
  const [mounting, setMounting] = useState(false)
  const loggedIn = useSelector(state => !!state.session.user);
  useEffect(() => {
    if (loggedIn !== undefined) setMounting(true)
  }, [loggedIn])
  return mounting ? (
    <Route
      {...rest}
      render={props =>
        loggedIn ? (
          <Component {...props} /> // to desired component
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  ) : null;
};
