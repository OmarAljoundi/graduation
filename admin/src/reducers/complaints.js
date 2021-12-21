import { RECEIVE_COMPLAINTS, UPDATE_STATUS } from '../actions/complaints'

export default function services(state = {}, action) {
  switch (action.type) {
    case RECEIVE_COMPLAINTS:
      return {
        ...state,
        ...action.complaints
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
