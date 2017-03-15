import * as actionTypes from '../actions/users/types'

const initialState = {
  isDataFetched: false,
  users: [],
  selectedUser: null,
}

const users = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_DATA_FETCHED: {
      return {
        ...state,
        isDataFetched: action.isFetched,
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
