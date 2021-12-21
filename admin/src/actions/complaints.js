export const RECEIVE_COMPLAINTS = 'RECEIVE_COMPLAINTS'
export const UPDATE_STATUS = 'UPDATE_COMPLAINTS'

export function getComplaints(complaints) {
  return {
    type: RECEIVE_COMPLAINTS,
    complaints
  }
}
export function updateComplaints(complaints, status, id) {
  return {
    type: UPDATE_STATUS,
    complaints,
    id,
    status
  }
}

export function handleSetComplaints(complaints) {
  return (dispatch) => {
    return dispatch(getComplaints(complaints))
  }
}

export function handleUpdateComplaints(status, id) {
  return (dispatch, getState) => {
    const { complaints } = getState()
    return dispatch(updateComplaints(complaints, status, id))
  }
}
