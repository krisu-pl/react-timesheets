import React, {
  PropTypes,
} from 'react'

import {
  sortWeekDays,
} from '../../utils/calendar'

import CalendarWeekDay from './CalendarWeekDay'

const CalendarWeek = (props) => {
  const getWeekClass = ({ status, weekId }) => {
    const baseClass = `Calendar-week ${props.selectedWeek === weekId ? 'Calendar-week--selected' : ''}`
    switch (status) {
      case 'approved':
        return `${baseClass} Calendar-week--green`
      case 'rejected':
        return `${baseClass} Calendar-week--red`
      case 'waiting':
        return `${baseClass} Calendar-week--yellow`
      default:
        return `${baseClass}`
    }
  }

  const bindedSelectWeek = props.selectWeek.bind(null, { weekId: props.week.week_id })

  return (
    <div
      className={getWeekClass({ status: props.week.status, weekId: props.week.week_id })}
      onClick={bindedSelectWeek}
    >
      { props.week.days_in_week.sort(sortWeekDays).map(day => (
        <CalendarWeekDay key={day.id} day={day} />
      ))}

    </div>
  )
}

CalendarWeek.propTypes = {
  week: PropTypes.shape({
    status: PropTypes.string,
    week_id: PropTypes.number.isRequired,
    days_in_week: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  selectWeek: PropTypes.func.isRequired,
  selectedWeek: PropTypes.number,
}

CalendarWeek.defaultProps = {
  selectedWeek: null,
}

export default CalendarWeek
