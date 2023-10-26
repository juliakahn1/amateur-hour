import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signup, clearSessionErrors } from '../../store/session';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './SessionForm.scss';

function SignupForm () {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [location, setLocation] = useState('');
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();
  const history = useHistory()

  const handleSubmit = e => {
    e.preventDefault();
    const user = {
      firstName,
      lastName,
      email,
      password,
      location
    };
    dispatch(signup(user))
      .then((res) => {
        if (res.ok) {
          history.push('/signup/services')
          dispatch(clearSessionErrors())
        }
      })
  }

  const update = field => {
    let setState;

    switch (field) {
      case 'email':
        setState = setEmail;
        break;
      case 'firstName':
        setState = setFirstName;
        break;
      case 'lastName':
        setState = setLastName;
        break;
      case 'password':
        setState = setPassword;
        break;
      case 'password2':
        setState = setPassword2;
        break;
      case 'location':
        setState = setLocation;
        break;
      default:
        throw Error('Unknown field in Signup Form');
    }

    return e => setState(e.currentTarget.value);
  }

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  return (
    <>
    <div className="session-page-background">
      <div className="session-page-container signup-page">
        <div className="session-page-inner-container signup-page">
          <h2 className="session-form-title signup-form">Create an account to begin booking jobs</h2>
          <form className="session-form signup-form" onSubmit={handleSubmit}>
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
              <span className="session-input-label">First Name</span>
              <input type="text"
                value={firstName}
                onChange={update('firstName')}
                placeholder="This is how you appear to other users"
                className="session-input-text-field"
              />
              <div className="session-errors">{errors?.firstName}</div>
            </div>
            <div className="session-input-container">
              <span className="session-input-label">Last Name</span>
              <input type="text"
                value={lastName}
                onChange={update('lastName')}
                placeholder="Your last name won't be shown on your profile"
                className="session-input-text-field"
              />
              <div className="session-errors">{errors?.lastName}</div>
            </div>
            <div className="session-input-container">
              <div className="session-input-container signup-location-dropdown">
                <span className="session-input-label signup-location">Location</span>
                <select
                  name="services"
                  onChange={update("location")}
                  className="signup-location-dropdown-menu"
                  >
                    <option selected value="null">Where are you located?</option>
                    <option value="ca-bay-area">California Bay Area</option>
                    <option value="s-ca">Southern California</option>
                    <option value="chicagoland">Chicagoland</option>
                </select>
              </div>
              <div className="session-errors">
                {errors?.location && 'Select a location'}
              </div>
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
            <div className="session-input-container">
              <span className="session-input-label">Confirm Password</span>
              <input type="password"
                value={password2}
                onChange={update('password2')}
                placeholder="Reenter your password"
                className="session-input-text-field"
              />
              <div className="session-errors">
                {password !== password2 && 'Confirm Password field must match'}
              </div>
            </div>
            <input
              className="session-form-button"
              type="submit"
              value="Create Account"
              disabled={!email || !firstName || !lastName || !password || password !== password2}
            />
          </form>
        </div>
      </div>
    </div>
    </>
  );
}

export default SignupForm;
