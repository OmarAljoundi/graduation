import { RECEIVE_SERVICES, UPDATE_STATUS } from '../actions/services'

export default function services(state = {}, action) {
  switch (action.type) {
    case RECEIVE_SERVICES:
      return {
        ...state,
        ...action.services
      }
    case UPDATE_STATUS:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          status: action.status
        }
      }
    default:
      return state
  }
}
