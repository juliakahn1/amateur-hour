import jwtFetch from "./jwt"

const GET_SERVICE = "services/GET_SERVICE"
const GET_SERVICES = "services/GET_SERVICES"
const ADD_SERVICE = "services/ADD_SERVICE"
const EDIT_SERVICE = "services/EDIT_SERVICE"
const REMOVE_SERVICE = "services/REMOVE_SERVICE"

const getService = service => {
  return {
    type: GET_SERVICE,
    service
  }
}

const getServices = services => {
  return {
    type: GET_SERVICES,
    services
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

export const fetchService = (serviceId) => async (dispatch) => {
  const res = await jwtFetch(`/api/services/${serviceId}`)
  if (res.ok) {
    const service = await res.json()
    dispatch(getService(service))
  }
}

export const fetchServices = () => async (dispatch) => {
  const res = await jwtFetch(`/api/services/`)
  if (res.ok) {
    const services = await res.json()
    dispatch(getServices(services))
    return services
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

export const updateService = (service, serviceId) => async (dispatch) => {
  const res = await jwtFetch(`/api/services/${serviceId}`, {
    method: 'PATCH',
    body: JSON.stringify(service)
  })
  if (res.ok) {
    const service = await res.json()
    dispatch(editService(service))
  }
}

export const deleteService = (serviceId) => async (dispatch) => {
  const res = await jwtFetch(`/api/services/${serviceId}`, {
    method: 'DELETE',
  })
  if (res.ok) {
    const service = await res.json()
    dispatch(removeService(service._id))
  }
}

export const servicesReducer = (store = {}, action) => {
  const newStore = { ...store }
  switch (action.type) {
    case GET_SERVICES:
      action.services.forEach(service => newStore[service._id] = service)
      return newStore
    case GET_SERVICE:
      return { ...store, [action.service._id]: action.service }
    case ADD_SERVICE:
      return { ...store, [action.service._id]: action.service}
    case EDIT_SERVICE:
      return { ...store, [action.service._id]: action.service}
    case REMOVE_SERVICE:
      delete newStore[action.serviceId]
      return newStore
    default:
      return store
  }
}

export default servicesReducer
