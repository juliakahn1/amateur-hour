import { statusOptions, jobDescriptionOptions } from "../constants";
import jwtFetch from "./jwt";
const { faker } = require("@faker-js/faker");

const GET_JOB = "jobs/GET_JOB";
const GET_JOBS = "jobs/GET_JOBS";
const ADD_JOB = "jobs/ADD_JOB";
const EDIT_JOB = "jobs/EDIT_JOB";
const REMOVE_JOB = "jobs/REMOVE_JOB";

const GET_JOB_ERRORS = "jobs/GET_JOB_ERRORS";
const CLEAR_JOB_ERRORS = "jobs/CLEAR_JOB_ERRORS";

const getJob = (job) => {
  return {
    type: GET_JOB,
    job,
  };
};

const getJobs = (jobs) => {
  return {
    type: GET_JOBS,
    jobs,
  };
};

const addJob = (job) => {
  return {
    type: ADD_JOB,
    job,
  };
};

const editJob = (job) => {
  return {
    type: EDIT_JOB,
    job,
  };
};

const removeJob = (jobId) => {
  return {
    type: REMOVE_JOB,
    jobId,
  };
};

const getJobErrors = (errors) => {
  return {
    type: GET_JOB_ERRORS,
    errors,
  };
};

export const clearJobErrors = (errors) => {
  return {
    type: CLEAR_JOB_ERRORS,
    errors,
  };
};

export const fetchJob = (jobId) => async (dispatch) => {
  try {
    const res = await jwtFetch(`/api/jobs/${jobId}`);
    if (res.ok) {
      const job = await res.json();
      const payload = {
        _id: job._id,
        service: job.service._id,
        provider: job.service.provider,
        client: {
          _id: job.client._id,
          firstName: job.client.firstName,
          email: job.client.email,
          location: job.client.location
        },
        statusDescription: job.statusDescription,
        date: job.date,
        description: job.description,
      };
      dispatch(getJob(payload));
    }
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400 || resBody.statusCode === 404) {
      return dispatch(getJobErrors(resBody.errors));
    }
  }
};

export const fetchJobs = () => async (dispatch) => {
  try {
    const res = await jwtFetch(`/api/jobs/`);
    if (res.ok) {
      const jobs = await res.json();
      const payload = jobs.map((job) => {
        return {
          _id: job._id,
          service: job.service._id,
          provider: job.service.provider,
          client: {
            _id: job.client._id,
            firstName: job.client.firstName,
            email: job.client.email,
            location: job.client.location,
          },
          statusDescription: job.statusDescription,
          date: job.date,
          description: job.description,
        };
      });
      dispatch(getJobs(payload));
    }
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400 || resBody.statusCode === 404) {
      return dispatch(getJobErrors(resBody.errors));
    }
  }
};

export const fetchClientJobs = (clientId) => async (dispatch) => {
  try {
    const res = await jwtFetch(`/api/jobs/client/${clientId}`);
    if (res.ok) {
      const jobs = await res.json();
      const payload = jobs.map((job) => {
        return {
          _id: job._id,
          service: job.service._id,
          provider: job.service.provider,
          client: {
            _id: job.client._id,
            firstName: job.client.firstName,
            email: job.client.email,
            location: job.client.location
          },
          statusDescription: job.statusDescription,
          date: job.date,
          description: job.description,
        };
      });
      dispatch(getJobs(payload));
      return payload
    }
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400 || resBody.statusCode === 404) {
      return dispatch(getJobErrors(resBody.errors));
    }
  }
};

export const fetchProviderJobs = (providerId) => async (dispatch) => {
  try {
    const res = await jwtFetch(`/api/jobs/provider/${providerId}`);
    if (res.ok) {
      const jobs = await res.json();
      const payload = jobs.map((job) => {
        return {
          _id: job._id,
          service: job.service._id,
          provider: job.service.provider,
          client: {
            _id: job.client._id,
            firstName: job.client.firstName,
            email: job.client.email,
            location: job.client.location
          },
          statusDescription: job.statusDescription,
          date: job.date,
          description: job.description,
        };
      });
      dispatch(getJobs(payload));
      return payload
    }
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400 || resBody.statusCode === 404) {
      return dispatch(getJobErrors(resBody.errors));
    }
  }
};

export const createJob = (job) => async (dispatch) => {
  try {
    const res = await jwtFetch("/api/jobs/", {
      method: "POST",
      body: JSON.stringify(job),
    });
    if (res.ok) {
      const job = await res.json();
      const payload = {
        _id: job._id,
        service: job.service._id,
        provider: job.service.provider,
        client: {
          _id: job.client._id,
          firstName: job.client.firstName,
          email: job.client.email,
          location: job.client.location
        },
        statusDescription: job.statusDescription,
        date: job.date,
        description: job.description,
      };
      dispatch(addJob(payload));
    }
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400 || resBody.statusCode === 404) {
      return dispatch(getJobErrors(resBody.errors));
    }
  }
};

export const createClientJobs = (services, userId) => async (dispatch) => {
    try {
        services.forEach(async (serviceRecord) => {
            const selectedStatus =
                statusOptions[Math.floor(Math.random() * statusOptions.length)];
            let selectedDate = faker.date.recent({ days: 10 });
            if (["requested", "accepted"].includes(selectedStatus)) {
                selectedDate = faker.date.soon({ days: 10 });
            }
            const job = {
                service: serviceRecord._id,
                client: userId,
                statusDescription: selectedStatus,
                date: selectedDate,
                description: faker.helpers.arrayElement(jobDescriptionOptions)
            }
            const res = await jwtFetch("/api/jobs/", {
                method: "POST",
                body: JSON.stringify(job),
            });
            if (res.ok) {
                const job = await res.json();
                const payload = {
                    _id: job._id,
                    service: job.service._id,
                    provider: job.service.provider,
                    client: {
                        _id: job.client._id,
                        firstName: job.client.firstName,
                        email: job.client.email,
                        location: job.client.location
                    },
                    statusDescription: job.statusDescription,
                    date: job.date,
                    description: job.description,
                };
                dispatch(addJob(payload));
            }
        })
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400 || resBody.statusCode === 404) {
            return dispatch(getJobErrors(resBody.errors));
        }
    }
};

export const createProviderJobs = (users, serviceId) => async (dispatch) => {
  try {
    users.forEach(async (userRecord) => {
      const selectedStatus =
        statusOptions[Math.floor(Math.random() * statusOptions.length)];
      let selectedDate = faker.date.recent({ days: 10 });
      if (["requested", "accepted"].includes(selectedStatus)) {
        selectedDate = faker.date.soon({ days: 10 });
      }
      const job = {
        service: serviceId,
        client: userRecord._id,
        statusDescription: selectedStatus,
        date: selectedDate,
        description: faker.helpers.arrayElement(jobDescriptionOptions)
      }
      const res = await jwtFetch("/api/jobs/", {
        method: "POST",
        body: JSON.stringify(job),
      });
      if (res.ok) {
        const job = await res.json();
        const payload = {
          _id: job._id,
          service: job.service._id,
          provider: job.service.provider,
          client: {
            _id: job.client._id,
            firstName: job.client.firstName,
            email: job.client.email,
            location: job.client.location
          },
          statusDescription: job.statusDescription,
          date: job.date,
          description: job.description,
        };
        dispatch(addJob(payload));
      }
    })
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400 || resBody.statusCode === 404) {
      return dispatch(getJobErrors(resBody.errors));
    }
  }
};

export const updateJob = (job, jobId) => async (dispatch) => {
  try {
    const res = await jwtFetch(`/api/jobs/${jobId}`, {
      method: "PATCH",
      body: JSON.stringify(job),
    });
    if (res.ok) {
      const job = await res.json();
      const payload = {
        _id: job._id,
        service: job.service._id,
        provider: job.service.provider,
        client: {
          _id: job.client._id,
          firstName: job.client.firstName,
          email: job.client.email,
          location: job.client.location
        },
        statusDescription: job.statusDescription,
        date: job.date,
        description: job.description,
      };
      dispatch(editJob(payload));
    }
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400 || resBody.statusCode === 404) {
      return dispatch(getJobErrors(resBody.errors));
    }
  }
};

export const deleteJob = (jobId) => async (dispatch) => {
  try {
    const res = await jwtFetch(`/api/jobs/${jobId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      const job = await res.json();
      dispatch(removeJob(job._id));
    }
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400 || resBody.statusCode === 404) {
      return dispatch(getJobErrors(resBody.errors));
    }
  }
};

const nullErrors = null;
export const jobsErrorsReducer = (state = nullErrors, action) => {
  switch (action.type) {
    case GET_JOB_ERRORS:
      return action.errors;
    case CLEAR_JOB_ERRORS:
      return nullErrors;
    default:
      return state;
  }
};

export const jobsReducer = (store = {}, action) => {
  const newStore = { ...store };
  switch (action.type) {
    case GET_JOBS:
      action.jobs.forEach((job) => (newStore[job._id] = job));
      return newStore;
    case GET_JOB:
      return { ...store, [action.job._id]: action.job };
    case ADD_JOB:
      return { ...store, [action.job._id]: action.job };
    case EDIT_JOB:
      return { ...store, [action.job._id]: action.job };
    case REMOVE_JOB:
      delete newStore[action.jobId];
      return newStore;
    default:
      return store;
  }
};

export default jobsReducer;
