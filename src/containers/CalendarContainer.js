import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import {
  selectMonth,
  getDataForMonth,
  selectWeek,
} from '../actions/calendar'

import {
  sortWeeks,
} from '../utils/calendar'

import '../css/Calendar.css'

import CalendarHeader from '../components/calendar/CalendarHeader'
import CalendarDayNames from '../components/calendar/CalendarDayNames'
import CalendarWeek from '../components/calendar/CalendarWeek'

class CalendarContainer extends Component {
  constructor() {
    super()

    this.goToPreviousMonth = this.goToPreviousMonth.bind(this)
    this.goToNextMonth = this.goToNextMonth.bind(this)
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

        <CalendarHeader
          selectedMonth={this.props.selectedMonth}
          goToPreviousMonth={this.goToPreviousMonth}
          goToNextMonth={this.goToNextMonth}
        />

        <CalendarDayNames />

        {this.props.weeks.sort(sortWeeks).map(week => (
          <CalendarWeek
            key={week.week_id}
            week={week}
            selectedWeek={this.props.selectedWeek}
            selectWeek={this.props.selectWeek}
          />
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
