import * as actionTypes from '../actions/calendar/types'

const initialState = {
  isDataFetched: false,
  users: [],
  selectedUser: null,
  selectedMonth: null,
  selectedYear: null,
  selectedWeek: null,
  weeks: [],
  popupMessage: null,
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
    case actionTypes.SELECT_USER: {
      return {
        ...state,
        selectedUser: action.userId,
      }
    }
    case actionTypes.SELECT_MONTH: {
      return {
        ...state,
        selectedMonth: action.month,
        selectedYear: action.year,
      }
    }
    case actionTypes.GET_DATA_FOR_MONTH: {
      return {
        ...state,
        weeks: action.weeks,
      }
    }
    case actionTypes.SELECT_WEEK: {
      return {
        ...state,
        selectedWeek: action.weekId,
      }
    }
    case actionTypes.UPDATE_WEEKS: {
      return {
        ...state,
        weeks: action.weeks,
      }
    }
    case actionTypes.SET_POPUP_MESSAGE: {
      return {
        ...state,
        popupMessage: action.popupMessage,
      }
    }
    default:
      return state
  }
}

export default calendar
