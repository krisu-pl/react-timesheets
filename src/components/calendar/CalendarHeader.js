import React, {
  PropTypes,
} from 'react'

import { getMonthName } from '../../utils/datetime'

const CalendarHeader = props => (
  <div className="Calendar-header">
    <button
      className="Calendar-header__arrow Calendar-header__arrow--left"
      onClick={props.goToPreviousMonth}
    >
      &laquo;
    </button>
    <div className="Calendar-header__month">
      { getMonthName(props.selectedMonth) }
    </div>
    <button
      className="Calendar-header__arrow Calendar-header__arrow--left"
      onClick={props.goToNextMonth}
    >
      &raquo;
    </button>
  </div>
)

CalendarHeader.propTypes = {
  goToPreviousMonth: PropTypes.func.isRequired,
  goToNextMonth: PropTypes.func.isRequired,
  selectedMonth: PropTypes.number,
}

CalendarHeader.defaultProps = {
  selectedMonth: null,
}

export default CalendarHeader
