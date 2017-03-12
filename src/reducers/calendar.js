import * as actionTypes from '../actions/calendar/types'

const initialState = {
  isDataFetched: false,
  users: [],
}

const calendar = (state = initialState, action) => {
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
    default:
      return state
  }
}

export default calendar
