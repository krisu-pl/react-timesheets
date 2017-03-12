import * as actionTypes from './types'

function fetchUsers() {
  return fetch('https://timesheet-staging-aurity.herokuapp.com/api/users')
}

export function setDataFetched(isFetched) {
  return {
    type: actionTypes.SET_DATA_FETCHED,
    isFetched
  }
}

export function updateUsersList(users) {
  return {
    type: actionTypes.UPDATE_USERS_LIST,
    users
  }
}

export function showError(message) {
  return {
    type: actionTypes.SHOW_ERROR,
    message
  }
}

export function getUsers() {
  return function (dispatch) {
    return fetchUsers().then((response) => {
        return response.json()
      }).then((users) => {
        dispatch(updateUsersList(users))
      }
    )
  }
}
