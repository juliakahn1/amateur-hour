import jwtFetch from "./jwt"

const GET_JOB = "jobs/GET_JOB";
const GET_JOBS = "jobs/GET_JOBS";
const ADD_JOB = "jobs/ADD_JOB";
const EDIT_JOB = "jobs/EDIT_JOB";
const REMOVE_JOB = "jobs/REMOVE_JOB";

const getJob = job => {
  return {
    type: GET_JOB,
    job
  }
}

const getJobs = jobs => {
  return {
    type: GET_JOBS,
    jobs
  }
}

const addJob = job => {
  return {
    type: ADD_JOB,
    job
  }
}

const editJob = job => {
  return {
    type: EDIT_JOB,
    job
  }
}

const removeJob = jobId => {
  return {
    type: REMOVE_JOB,
    jobId
  }
}

export const fetchJob = (jobId) => async (dispatch) => {
  const res = await jwtFetch(`/api/jobs/${jobId}`)
  if (res.ok) {
    const job = await res.json()
    dispatch(getJob(job))
  }
}

export const fetchJobs = () => async (dispatch) => {
  const res = await jwtFetch(`/api/jobs/`)
  if (res.ok) {
    const jobs = await res.json()
    dispatch(getJobs(jobs))
  }
}

export const fetchClientJobs = (clientId) => async (dispatch) => {
  const res = await jwtFetch(`/api/jobs/client/${clientId}`)
  if (res.ok) {
    const jobs = await res.json()
    dispatch(getJobs(jobs))
  }
}

export const fetchProviderJobs = (providerId) => async (dispatch) => {
  const res = await jwtFetch(`/api/jobs/provider/${providerId}`)
  if (res.ok) {
    const jobs = await res.json()
    dispatch(getJobs(jobs))
  }
}

export const createJob = (job) => async (dispatch) => {
  const res = await jwtFetch('/api/jobs/', {
    method: 'POST',
    body: JSON.stringify(job)
  })
  if (res.ok) {
    const job = await res.json()
    dispatch(addJob(job))
  }
}

export const updateJob = (job, jobId) => async (dispatch) => {
  const res = await jwtFetch(`/api/jobs/${jobId}`, {
    method: 'PATCH',
    body: JSON.stringify(job)
  })
  if (res.ok) {
    const job = await res.json()
    dispatch(editJob(job))
  }
}

export const deleteJob = (jobId) => async (dispatch) => {
  const res = await jwtFetch(`/api/jobs/${jobId}`, {
    method: 'DELETE',
  })
  if (res.ok) {
    const job = await res.json()
    dispatch(removeJob(job._id))
  }
}

export const jobsReducer = (store = {}, action) => {
  const newStore = { ...store }
  switch (action.type) {
    case GET_JOBS:
      action.jobs.forEach(job => newStore[job._id] = job)
      return newStore
    case GET_JOB:
      return { ...store, [action.job._id]: action.job }
    case ADD_JOB:
      return { ...store, [action.job._id]: action.job}
    case EDIT_JOB:
      return { ...store, [action.job._id]: action.job}
    case REMOVE_JOB:
      delete newStore[action.jobId]
      return newStore
    default:
      return store
  }
}

export default jobsReducer
