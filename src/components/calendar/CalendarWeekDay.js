import React, {
  PropTypes,
} from 'react'

const CalendarWeekDay = props => (
  <div className="Calendar-week__day">
    { props.day.day_number }
    { (props.day.hours > 0) ? <small>{props.day.hours}h</small> : '' }
  </div>
)

CalendarWeekDay.propTypes = {
  day: PropTypes.shape({
    day_number: PropTypes.number.isRequired,
    hours: PropTypes.number,
  }).isRequired,
}

export default CalendarWeekDay
