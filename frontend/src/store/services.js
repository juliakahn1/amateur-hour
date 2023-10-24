import jwtFetch from "./jwt"

const GET_SERVICE = "service/GET_SERVICE"
const ADD_SERVICE = "service/ADD_SERVICE"
const EDIT_SERVICE = "service/EDIT_SERVICE"
const REMOVE_SERVICE = "service/REMOVE_SERVICE"

// post

const getService = service => {
  return {
    type: GET_SERVICE,
    service
  }
}

const addService = service => {
  return {
    type: ADD_SERVICE,
    service
  }
}

const editService = service => {
  return {
    type: EDIT_SERVICE,
    service
  }
}

const removeService = serviceId => {
  return {
    type: REMOVE_SERVICE,
    serviceId
  }
}

export const createService = (service) => async (dispatch) => {
  const res = await jwtFetch('/api/services/', {
    method: 'POST',
    body: JSON.stringify(service)
  })
  if (res.ok) {
    const service = await res.json()
    dispatch(addService(service))
  }
}

export const servicesReducer = (store = {}, action) => {
  switch (action.type) {
    case ADD_SERVICE:
      return { ...store, [action.service._id]: action.service}
    default:
      return store
  }
}

export default servicesReducer
