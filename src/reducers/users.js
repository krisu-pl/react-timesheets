import * as actionTypes from '../actions/users/types'

const initialState = {
  isUsersDataFetched: false,
  users: [],
  selectedUser: null,
}

const users = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER_DATA_FETCHED: {
      return {
        ...state,
        isUsersDataFetched: action.isFetched,
      }
    }
    case actionTypes.UPDATE_USERS_LIST: {
      return {
        ...state,
        users: action.users,
      }
    }
    case actionTypes.SELECT_USER: {
      return {
        ...state,
        selectedUser: action.userId,
      }
    }
    default:
      return state
  }
}

export default users
