import { createClientJobs, createProviderJobs, deleteJob, fetchClientJobs, fetchProviderJobs } from './jobs';
import jwtFetch from './jwt';
import { fetchServices } from './services';

const RECEIVE_CURRENT_USER = "session/RECEIVE_CURRENT_USER";
const RECEIVE_SESSION_ERRORS = "session/RECEIVE_SESSION_ERRORS";
const CLEAR_SESSION_ERRORS = "session/CLEAR_SESSION_ERRORS";
export const RECEIVE_USER_LOGOUT = "session/RECEIVE_USER_LOGOUT";

// Dispatch receiveCurrentUser when a user logs in.
const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

// Dispatch receiveErrors to show authentication errors on the frontend.
const receiveErrors = errors => {
  return {
    type: RECEIVE_SESSION_ERRORS,
    errors
  }
};

// Dispatch logoutUser to clear the session user when a user logs out.
const logoutUser = () => ({
  type: RECEIVE_USER_LOGOUT
});

// Dispatch clearSessionErrors to clear any session errors.
export const clearSessionErrors = () => ({
  type: CLEAR_SESSION_ERRORS
});

export const signup = user => startSession(user, 'api/users/register');
export const login = user => {
  return startSession(user, 'api/users/login');
}

const startSession = (userInfo, route) => async dispatch => {
  try {
    const res = await jwtFetch(route, {
      method: "POST",
      body: JSON.stringify(userInfo)
    });
    const { user, token } = await res.clone().json();
    localStorage.setItem('jwtToken', token);
    dispatch(receiveCurrentUser(user));
    return user
  } catch(err) {
    const res = await err.clone().json();
    if (res.statusCode === 400) {
      dispatch(receiveErrors(res.errors));
      return res
    }
  }
};

export const logout = () => dispatch => {
  localStorage.removeItem('jwtToken');
  dispatch(logoutUser());
};

const initialState = {
  user: undefined
};

export const fetchUsers = () => async (dispatch) => {
  try {
    const res = await jwtFetch(`/api/users/`);
    if (res.ok) {
      const users = await res.json()
      return users
    } else {
      return res.json()
    }
  } catch(err) {
    return err.json()
  }
}

export const resetDemoJobs = demoUserId => dispatch => {
  try {
    // delete all jobs where the demo user is the client
    dispatch(fetchClientJobs(demoUserId))
    .then(clientJobs=>{
      clientJobs.forEach(job=>{
        dispatch(deleteJob(job._id))
      })
    })
    .then(()=>dispatch(fetchProviderJobs(demoUserId)))
    .then(providerJobs=>{
      // delete all jobs where the demo user is the provider
      providerJobs.forEach(job=>{
        dispatch(deleteJob(job._id))
      })
    })
    .then(()=>dispatch(fetchServices()))
    .then(services=> {
      // create random jobs where the demo user is the client
      const serviceId = services.find(service=> service.provider._id===demoUserId)._id
      const randServices = Object.values(services).sort(() => 0.5 - Math.random()).slice(0, 4)
      return Promise.all([dispatch(createClientJobs(randServices, demoUserId)), serviceId]);
    })
    .then(([clientJobs, serviceId])=> {
      return Promise.all([dispatch(fetchUsers()), serviceId])
    })
    .then(([users, serviceId])=> {
      // create random jobs where the demo user is the provider
      const randUsers = Object.values(users).sort(() => 0.5 - Math.random()).slice(0, 4)
      dispatch(createProviderJobs(randUsers, serviceId))
    })
  } catch(err) {
    return err.json()
  }
}

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return { user: action.currentUser };
    case RECEIVE_USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
};

const nullErrors = null;

export const sessionErrorsReducer = (state = nullErrors, action) => {
  switch(action.type) {
    case RECEIVE_SESSION_ERRORS:
      return action.errors;
    case RECEIVE_CURRENT_USER:
    case CLEAR_SESSION_ERRORS:
      return nullErrors;
    default:
      return state;
  }
};

export const getCurrentUser = () => async dispatch => {
  const res = await jwtFetch('/api/users/current');
  const user = await res.json();
  return dispatch(receiveCurrentUser(user));
};

export default sessionReducer;
