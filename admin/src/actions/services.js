export const RECEIVE_SERVICES = 'RECEIVE_SERVICES'
export const REST_SERVICES = 'REST_SERVICES'
export const UPDATE_STATUS = 'UPDATE_STATUS'

export function getServices(services) {
  return {
    type: RECEIVE_SERVICES,
    services
  }
}
export function updateService(services, status, id) {
  return {
    type: UPDATE_STATUS,
    services,
    id,
    status
  }
}

export function restServices() {
  return {
    type: REST_SERVICES
  }
}

export function handleSetServices(services) {
  return (dispatch) => {
    return dispatch(getServices(services))
  }
}
export function handleUpdateService(status, id) {
  return (dispatch, getState) => {
    const { services } = getState()
    return dispatch(updateService(services, status, id))
  }
}

export function handleRestServices(services) {
  return (dispatch) => {
    return dispatch(restServices(services))
  }
}
