import * as actionTypes from './types'
import Api from '../../utils/Api'

export function selectMonth({ month, year }) {
  return {
    type: actionTypes.SELECT_MONTH,
    month,
    year,
  }
}

export function selectWeek({ weekId }) {
  return {
    type: actionTypes.SELECT_WEEK,
    weekId,
  }
}

export function getDataForMonth({ month, year, userId }) {
  return (dispatch) => {
    return Api.getDataForMonth({ month, year, userId }).then((response) => {
      return response.json()
    }).then(
      ({ data }) => {
        dispatch({
          type: actionTypes.GET_DATA_FOR_MONTH,
          weeks: data.weeks,
        })
      },
    )
  }
}

export function updateWeeks({ weeks }) {
  return {
    type: actionTypes.UPDATE_WEEKS,
    weeks,
  }
}

export function setPopupMessage({ msg }) {
  return {
    type: actionTypes.SET_POPUP_MESSAGE,
    popupMessage: msg,
  }
}

export function postUpdatedWeek({ week, userId }) {
  return (dispatch) => {
    return Api.updateWeek({ week, userId }).then((response) => {
      return response.json()
    }).then(
      () => {
        dispatch(setPopupMessage({ msg: 'Week has been updated!' }))
        setTimeout(() => {
          dispatch(setPopupMessage({ msg: null }))
        }, 2500)
      },
    )
  }
}
