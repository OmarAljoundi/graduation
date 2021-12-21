export const AUTH_USER_ID = 'AUTH_USER_ID'
export const RESET_AUTH_USER = 'RESET_AUTH_USER'

export function setAuthedUser(authedUser, token) {
  return {
    type: AUTH_USER_ID,
    authedUser,
    token
  }
}

export function handleSetAuthedUser(authedUser, token) {
  return (dispatch) => {
    return dispatch(setAuthedUser(authedUser, token))
  }
}

export function resetAuthedUser() {
  return {
    type: RESET_AUTH_USER,
    setNull: null
  }
}

export function handleResetAuthedUser() {
  return (dispatch) => {
    return dispatch(resetAuthedUser())
  }
}
