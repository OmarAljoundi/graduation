import { AUTH_USER_ID, RESET_AUTH_USER } from '../actions/authedUser'

export default function authedUser(state = null, action) {
  switch (action.type) {
    case AUTH_USER_ID:
      return {
        ...state,
        ...action.authedUser,
        signin: true,
        token: action.token
      }
    case RESET_AUTH_USER:
      return {
        ...action.setNull,
        signin: false,
        token: null
      }

    default:
      return state
  }
}
