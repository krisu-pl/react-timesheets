import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import {
  selectMonth,
  getDataForMonth,
  selectWeek,
} from '../actions/calendar'

import {
  sortWeeks,
  sortWeekDays,
} from '../utils/calendar'
import { getMonthName } from '../utils/datetime'

import '../css/Calendar.css'

class CalendarContainer extends Component {
  constructor() {
    super()

    this.goToPreviousMonth = this.goToPreviousMonth.bind(this)
    this.goToNextMonth = this.goToNextMonth.bind(this)
  }

  getWeekClass({ status, weekId }) {
    const baseClass = `Calendar-week ${this.props.selectedWeek === weekId ? 'Calendar-week--selected' : ''}`
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

  goToPreviousMonth() {
    const oldMonth = this.props.selectedMonth
    const year = this.props.selectedYear
    const userId = this.props.selectedUser

    const month = (oldMonth - 1 < 0) ? 11 : oldMonth - 1
    this.props.selectMonth({ month, year })
    this.props.getDataForMonth({ month, year, userId })
  }

  goToNextMonth() {
    const oldMonth = this.props.selectedMonth
    const year = this.props.selectedYear
    const userId = this.props.selectedUser

    const month = (oldMonth + 1 > 11) ? 0 : oldMonth + 1
    this.props.selectMonth({ month, year })
    this.props.getDataForMonth({ month, year, userId })
  }

  render() {
    const calendarOverlay = (this.props.selectedUser && this.props.weeks.length > 0) ? '' : <div className="Calendar__overlay">Select user to start</div>

    return (
      <div className="Calendar">
        { calendarOverlay }
        <div className="Calendar-header">
          <button
            className="Calendar-header__arrow Calendar-header__arrow--left"
            onClick={this.goToPreviousMonth}
          >
            &laquo;
          </button>
          <div className="Calendar-header__month">
            { getMonthName(this.props.selectedMonth) }
          </div>
          <button
            className="Calendar-header__arrow Calendar-header__arrow--left"
            onClick={this.goToNextMonth}
          >
            &raquo;
          </button>
        </div>

        <div className="Calendar-day-names">
          <div className="Calendar-day-names__day">Mon</div>
          <div className="Calendar-day-names__day">Tue</div>
          <div className="Calendar-day-names__day">Wed</div>
          <div className="Calendar-day-names__day">Thu</div>
          <div className="Calendar-day-names__day">Fri</div>
          <div className="Calendar-day-names__day">Sat</div>
          <div className="Calendar-day-names__day">Sun</div>
        </div>

        {this.props.weeks.sort(sortWeeks).map(week => (
          <div
            key={week.week_id}
            className={this.getWeekClass({ status: week.status, weekId: week.week_id })}
            onClick={() => this.props.selectWeek({ weekId: week.week_id })}
          >

            { week.days_in_week.sort(sortWeekDays).map(day => (

              <div key={day.id} className="Calendar-week__day">
                { day.day_number }
                { (day.hours > 0) ? <small>{day.hours}h</small> : '' }
              </div>

            ))}

          </div>

        ))}

      </div>
    )
  }
}

CalendarContainer.propTypes = {
  selectWeek: PropTypes.func.isRequired,
  selectMonth: PropTypes.func.isRequired,
  getDataForMonth: PropTypes.func.isRequired,
  selectedMonth: PropTypes.number,
  selectedYear: PropTypes.number,
  selectedWeek: PropTypes.number,
  selectedUser: PropTypes.number,
  weeks: PropTypes.arrayOf(PropTypes.object).isRequired,
}

CalendarContainer.defaultProps = {
  selectedMonth: null,
  selectedYear: null,
  selectedWeek: null,
  selectedUser: null,
}

const mapStateToProps = state => ({
  selectedUser: state.users.selectedUser,
  weeks: state.calendar.weeks,
  selectedMonth: state.calendar.selectedMonth,
  selectedYear: state.calendar.selectedYear,
  selectedWeek: state.calendar.selectedWeek,
})

const mapDispatchToProps = ({
  selectMonth,
  getDataForMonth,
  selectWeek,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CalendarContainer)
