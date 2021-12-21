export const RECEIVE_USERS = 'RECEIVE_USERS'
export const REST_USERS = 'REST_USERS'

export function getUsers(users) {
  return {
    type: RECEIVE_USERS,
    users
  }
}

export function restUsers() {
  return {
    type: REST_USERS
  }
}

export function handleSetUsers(users) {
  return (dispatch) => {
    return dispatch(getUsers(users))
  }
}

export function handleRestUsers(users) {
  return (dispatch) => {
    return dispatch(restUsers(users))
  }
}
