import * as actionTypes from '../actions/calendar/types'

const initialState = {
  selectedMonth: null,
  selectedYear: null,
  selectedWeek: null,
  weeks: [],
  popupMessage: null,
}

const calendar = (state = initialState, action) => {
  switch (action.type) {
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
        selectedWeek: null,
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
        selectedWeek: null,
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
