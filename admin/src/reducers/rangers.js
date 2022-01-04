import { CHANGE_ROLE, DELETE_RANGER, RECEIVE_RANGERS } from '../actions/rangers'

export default function rangers(state = {}, action) {
  switch (action.type) {
    case RECEIVE_RANGERS:
      return {
        ...state,
        ...action.rangers
      }
    case DELETE_RANGER:
      return Object.values(action.rangers).filter((ranger) => ranger.id !== action.id)

    case CHANGE_ROLE:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          role: action.role
        }
      }

    default:
      return state
  }
}
