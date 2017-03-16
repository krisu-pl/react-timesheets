import * as actionTypes from './types'
import Api from '../../utils/Api'

export function setUserDataFetched(isFetched) {
  return {
    type: actionTypes.SET_USER_DATA_FETCHED,
    isFetched,
  }
}

export function updateUsersList(users) {
  return {
    type: actionTypes.UPDATE_USERS_LIST,
    users,
  }
}

export function getUsers() {
  return (dispatch) => {
    return Api.fetchUsers().then((response) => {
      return response.json()
    }).then(
      (users) => {
        dispatch(updateUsersList(users))
      },
    )
  }
}

export function selectUser({ userId }) {
  return {
    type: actionTypes.SET_SELECTED_USER,
    userId,
  }
}
