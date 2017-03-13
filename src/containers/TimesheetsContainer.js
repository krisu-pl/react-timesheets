import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { setDataFetched, getUsers, selectUser, selectMonth, getDataForMonth } from '../actions/calendar'

import '../css/Loading.css'
import '../css/User-select.css'
import '../css/Calendar.css'
import '../css/Controls.css'

import UserSelect from '../components/UserSelect'
import Controls from '../components/Controls'

import { getMonthName } from '../utils/datetime'
import { sortWeeks, sortWeekDays } from '../utils/calendar'

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

  handleApprove() {
    return true
  }

  handleReject() {
    return true
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
    const month = new Date().getMonth()
    const year = new Date().getFullYear()
    this.props.selectUser(userId)
    this.props.selectMonth({ month, year })
    this.props.getDataForMonth({ month, year, userId })

    return true
  }

  getWeekClass(status) {
    const baseClass = 'Calendar-week'
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

  render() {
    const loadingSpinner = this.props.isDataFetched ? '' : <div className="Loading">Fetching data...</div>

    return (
      <div>
        { loadingSpinner }
        <UserSelect
          handleUserSelection={this.handleUserSelection}
          users={this.props.users}
        />


        <div className="Calendar">
          <div className="Calendar-header">
            <div
              className="Calendar-header__arrow Calendar-header__arrow--left"
              onClick={this.goToPreviousMonth}
            >
              &laquo;
            </div>
            <div className="Calendar-header__month">
              { getMonthName(this.props.selectedMonth) }
            </div>
            <div
              className="Calendar-header__arrow Calendar-header__arrow--left"
              onClick={this.goToNextMonth}
            >
              &raquo;
            </div>
          </div>

          <div className="Calendar-week Calendar-week--day-names">
            <div className="Calendar-week__day">Mon</div>
            <div className="Calendar-week__day">Tue</div>
            <div className="Calendar-week__day">Wed</div>
            <div className="Calendar-week__day">Thu</div>
            <div className="Calendar-week__day">Fri</div>
            <div className="Calendar-week__day">Sat</div>
            <div className="Calendar-week__day">Sun</div>
          </div>

          {this.props.weeks.sort(sortWeeks).map(week => (
            <div key={week.week_id} className={this.getWeekClass(week.status)}>

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
})

const mapDispatchToProps = ({
  setDataFetched,
  getUsers,
  selectUser,
  selectMonth,
  getDataForMonth,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TimesheetsContainer)
