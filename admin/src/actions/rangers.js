export const RECEIVE_RANGERS = 'RECEIVE_RANGERS'
export const DELETE_RANGER = 'DELETE_RANGER'
export const CHANGE_ROLE = 'CHANGE_ROLE'

export function getRangers(rangers) {
  return {
    type: RECEIVE_RANGERS,
    rangers
  }
}
export function deleteRanger(rangers, id) {
  return {
    type: DELETE_RANGER,
    rangers,
    id
  }
}

export function changeRoleRanger(rangers, id, role) {
  return {
    type: CHANGE_ROLE,
    rangers,
    id,
    role
  }
}

export function handleSetRangers(rangers) {
  return (dispatch) => {
    return dispatch(getRangers(rangers))
  }
}
export function handleDeleteRanger(id) {
  return (dispatch, getState) => {
    const { rangers } = getState()
    return dispatch(deleteRanger(rangers, id))
  }
}

export function handleChangeRole(id, role) {
  return (dispatch, getState) => {
    const { rangers } = getState()
    return dispatch(changeRoleRanger(rangers, id, role))
  }
}
