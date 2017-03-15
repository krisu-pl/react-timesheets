import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import {
  setDataFetched,
  getUsers,
  selectUser,
  selectMonth,
  getDataForMonth,
  selectWeek,
  updateWeeks,
  postUpdatedWeek
} from '../actions/calendar'

import '../css/Loading.css'
import '../css/Popup-message.css'
import '../css/User-select.css'
import '../css/Calendar.css'
import '../css/Controls.css'

import UserSelect from '../components/UserSelect'
import Controls from '../components/Controls'

import { getMonthName } from '../utils/datetime'
import { WeekStatus, sortWeeks, sortWeekDays, findWeekById, setWeekStatus, updateWeeksList } from '../utils/calendar'

class TimesheetsContainer extends Component {
  constructor() {
    super()

    this.handleApprove = this.handleApprove.bind(this)
    this.handleReject = this.handleReject.bind(this)
    this.handleUserSelection = this.handleUserSelection.bind(this)
    this.goToPreviousMonth = this.goToPreviousMonth.bind(this)
    this.goToNextMonth = this.goToNextMonth.bind(this)
  }

  componentDidMount() {
    this.props.getUsers().then(
      () => {
        this.props.setDataFetched(true)
      },
    )
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

  changeWeekStatus(status) {
    const selectedWeekId = this.props.selectedWeek
    if (selectedWeekId) {
      const currentWeeks = this.props.weeks
      const selectedWeek = findWeekById(currentWeeks, selectedWeekId)
      const updatedWeek = setWeekStatus(selectedWeek, status)
      const weeks = updateWeeksList(currentWeeks, updatedWeek)
      this.props.updateWeeks({ weeks })
      this.props.postUpdatedWeek({ week: updatedWeek, userId: this.props.selectedUser })
    }
  }

  handleApprove() {
    this.changeWeekStatus(WeekStatus.APPROVED)
  }

  handleReject() {
    this.changeWeekStatus(WeekStatus.REJECTED)
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

  handleUserSelection(event) {
    const userId = event.target.value
    if (userId > -1) {
      const month = new Date().getMonth()
      const year = new Date().getFullYear()
      this.props.selectUser({ userId })
      this.props.selectMonth({ month, year })
      this.props.getDataForMonth({ month, year, userId })
    } else {
      this.props.selectUser({ userId: null })
    }
  }

  render() {
    const loadingSpinner = this.props.isDataFetched ? '' : <div className="Loading">Fetching data...</div>
    const popupMessage = this.props.popupMessage ? <div className="Popup-message">{this.props.popupMessage}</div> : ''
    const calendarOverlay = (this.props.selectedUser && this.props.weeks.length > 0) ? '' :
      <div className="Calendar__overlay">Select user to start</div>

    return (
      <div>
        { loadingSpinner }
        { popupMessage }

        <UserSelect
          handleUserSelection={this.handleUserSelection}
          users={this.props.users}
        />


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

        <Controls
          handleApprove={this.handleApprove}
          handleReject={this.handleReject}
        />
      </div>
    )
  }
}

TimesheetsContainer.PropTypes = {
  getUsers: PropTypes.func.isRequired,
  selectUser: PropTypes.func.isRequired,
  getDataForMonth: PropTypes.func.isRequired,
  setDataFetched: PropTypes.func,
  isDataFetched: PropTypes.bool,
}

const mapStateToProps = state => ({
  isDataFetched: state.calendar.isDataFetched,
  users: state.calendar.users,
  weeks: state.calendar.weeks,
  selectedMonth: state.calendar.selectedMonth,
  selectedYear: state.calendar.selectedYear,
  selectedUser: state.calendar.selectedUser,
  selectedWeek: state.calendar.selectedWeek,
  popupMessage: state.calendar.popupMessage,
})

const mapDispatchToProps = ({
  setDataFetched,
  getUsers,
  selectUser,
  selectMonth,
  getDataForMonth,
  selectWeek,
  updateWeeks,
  postUpdatedWeek,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TimesheetsContainer)
