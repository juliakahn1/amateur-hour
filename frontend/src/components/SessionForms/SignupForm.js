import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SessionForm.css';
import { signup, clearSessionErrors } from '../../store/session';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

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
    // return <Redirect to='/signup/services' />
    history.push('/signup/services')
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
      <form className="session-form" onSubmit={handleSubmit}>
        <h2>Sign Up Form</h2>
        <div className="errors">{errors?.email}</div>
        <label>
          <span>Email</span>
          <input type="text"
            value={email}
            onChange={update('email')}
            placeholder="Email"
          />
        </label>
        <div className="errors">{errors?.firstName}</div>
        <label>
          <span>First Name</span>
          <input type="text"
            value={firstName}
            onChange={update('firstName')}
            placeholder="First name"
          />
        </label>
        <div className="errors">{errors?.lastName}</div>
        <label>
          <span>Last Name</span>
          <input type="text"
            value={lastName}
            onChange={update('lastName')}
            placeholder="Last name"
          />
        </label>
        <div className="errors">{errors?.location}</div>
        <label>
          <span>Location (optional)</span>
          <select name="services" onChange={update("location")}>
            <option selected value="none">Where are you located?</option>
            <option value="ca-bay-area">California Bay Area</option>
            <option value="s-ca">Southern California</option>
            <option value="chicagoland">Chicagoland</option>
          </select>
        </label>
        <div className="errors">{errors?.password}</div>
        <label>
          <span>Password</span>
          <input type="password"
            value={password}
            onChange={update('password')}
            placeholder="Password"
          />
        </label>
        <div className="errors">
          {password !== password2 && 'Confirm Password field must match'}
        </div>
        <label>
          <span>Confirm Password</span>
          <input type="password"
            value={password2}
            onChange={update('password2')}
            placeholder="Reenter your password"
          />
        </label>
        <input
          type="submit"
          value="Create Account"
          disabled={!email || !firstName || !lastName || !password || password !== password2}
        />
      </form>
    </>
  );
}

export default SignupForm;
