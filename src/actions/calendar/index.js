import * as actionTypes from './types'
import Api from '../../utils/Api'

export function setDataFetched(isFetched) {
  return {
    type: actionTypes.SET_DATA_FETCHED,
    isFetched,
  }
}

export function updateUsersList(users) {
  return {
    type: actionTypes.UPDATE_USERS_LIST,
    users,
  }
}

export function showError(message) {
  return {
    type: actionTypes.SHOW_ERROR,
    message,
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

export function selectUser(userId) {
  return {
    type: actionTypes.SELECT_USER,
    userId,
  }
}

export function selectMonth({ month, year }) {
  return {
    type: actionTypes.SELECT_MONTH,
    month,
    year,
  }
}

export function getDataForMonth(options) {
  return (dispatch) => {
    return Api.getDataForMonth(options).then((response) => {
      return response.json()
    }).then(
      ({ data }) => {
        const action = {
          type: actionTypes.GET_DATA_FOR_MONTH,
          weeks: data.weeks,
        }
        dispatch(action)
      },
    )
  }
}
