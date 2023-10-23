import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';

import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import NavBar from './components/NavBar/NavBar';

import Home from './components/Home/Home';
import LoginForm from './components/SessionForms/LoginForm';
import SignupForm from './components/SessionForms/SignupForm';

import { getCurrentUser } from './store/session';

function App() {
  // const [loaded, setLoaded] = useState(false);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getCurrentUser()).then(() => setLoaded(true));
  // }, [dispatch]);

  // return loaded && (
    return (
    <>
      <NavBar />
      <Switch>
        <AuthRoute exact path="/" component={Home} />
        <AuthRoute exact path="/login" component={LoginForm} />
        <AuthRoute exact path="/signup" component={SignupForm} />
      </Switch>
    </>
  );
}

export default App;
