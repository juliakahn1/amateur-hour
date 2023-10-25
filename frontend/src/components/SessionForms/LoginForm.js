import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './SessionForm.scss';

import { login, clearSessionErrors } from '../../store/session';

function LoginForm () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();
  const history = useHistory()

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    const setState = field === 'email' ? setEmail : setPassword;
    return e => setState(e.currentTarget.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
    history.push('/')
  }

  const toSignUp = (e) => {
    e.preventDefault()
    history.push('/signup')
  }

  return (
    <>
      <div className="session-page-container login-page">
        <div className="session-page-inner-container login-page">
          {/* <p>
            A description about the gist of the site and its purpose goes here.
            Includes mission statement and aim of use.
          </p> */}
          <h2 className="session-form-title login-form">Log in to book new services and see your ongoing jobs</h2>
          <form className="session-form login-form" onSubmit={handleSubmit}>
            <div className="session-input-container">
              <span className="session-input-label">Email</span>
              <input type="text"
                value={email}
                onChange={update('email')}
                placeholder="Email"
                className="session-input-text-field"
              />
            <div className="session-errors">{errors?.email}</div>
            </div>
            <div className="session-input-container">
              <span className="session-input-label">Password</span>
              <input type="password"
                value={password}
                onChange={update('password')}
                placeholder="Password"
                className="session-input-text-field"
              />
            <div className="session-errors">{errors?.password}</div>
            </div>
            <input
              type="submit"
              value="Log In"
              disabled={!email || !password}
              className="session-form-button"
            />
          <button className="session-form-button create-account"
            onClick={toSignUp}>
            Create an AmateurHour account
          </button>
          </form>
        </div>
        </div>
    </>
  );
}

export default LoginForm;
