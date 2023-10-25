import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';

import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import NavBar from './components/NavBar/NavBar';

import Home from './components/Home/Home';
import LoginForm from './components/SessionForms/LoginForm';
import SignupForm from './components/SessionForms/SignupForm';
import ServicesForm from './components/SessionForms/ServicesForm';
import Profile from './components/Profile/Profile';
import Dashboard from './components/Dashboard/Dashboard';

import { getCurrentUser } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return loaded && (
    <>
      <NavBar />
      <Switch>
        <ProtectedRoute exact path="/signup/services" component={ServicesForm} />
        <AuthRoute exact path="/signup" component={SignupForm} />
        <AuthRoute exact path="/login" component={LoginForm} />
        <ProtectedRoute exact path="/dashboard" component={Dashboard} />
        <AuthRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/profile" component={Profile}/>
      </Switch>
    </>
  );
}

export default App;
