import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SessionForm.css';
import { signup, clearSessionErrors } from '../../store/session';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

function SignupForm () {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [location, setLocation] = useState('');
  const [service, setService] = useState('');
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();
  let form

  const updateProfile = (e) => {
    e.preventDefault()
    // patch profile with services/links from local state "service"
    // redirect to user index
  }

  const handleSubmit = e => {
    e.preventDefault();
    const user = {
      email,
      username,
      password,
      location
    };

    dispatch(signup(user));
    form = (
      <>
        <div className="profile-services-form">
          <h2>Profile details</h2>
          <h3>Services</h3>
          <div className="service-type-tiles">
            <button onClick={() => setService('Photography')}>Photography</button>
            <button onClick={() => setService('Gardening')}>Gardening</button>
          </div>
        </div>
          <button onClick={() => updateProfile(e)}>Create Account</button>
        <button>Skip</button>
      </>
    )
  }

  const update = field => {
    let setState;

    switch (field) {
      case 'email':
        setState = setEmail;
        break;
      case 'username':
        setState = setUsername;
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

  form = (
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
      <div className="errors">{errors?.username}</div>
      <label>
        <span>Username</span>
        <input type="text"
          value={username}
          onChange={update('username')}
          placeholder="Username"
        />
      </label>
      <div className="errors">{errors?.location}</div>
      <label>
        <span>Location</span>
        <input type="text"
          value={location}
          onChange={update('location')}
          placeholder="Where are you?"
        />
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
          placeholder="Confirm Password"
        />
      </label>
      <input
        type="submit"
        value="Next"
        disabled={!email || !username || !password || password !== password2}
      />
    </form>
  )

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  return (
    <>
      { form }
    </>
  );
}

export default SignupForm;
