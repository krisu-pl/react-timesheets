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

class TimesheetsContainer extends Component {
  constructor() {
    super()

    this.handleApprove = this.handleApprove.bind(this)
    this.handleReject = this.handleReject.bind(this)
    this.handleUserSelection = this.handleUserSelection.bind(this)
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

  handleUserSelection(event) {
    const userId = event.target.value
    const month = new Date().getMonth()
    const year = new Date().getFullYear()
    this.props.selectUser(userId)
    this.props.selectMonth({ month, year })
    this.props.getDataForMonth({ month, year, userId })

    return true
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
            <div className="Calendar-header__arrow Calendar-header__arrow--left">
              &laquo;
            </div>
            <div className="Calendar-header__month">
              { getMonthName(this.props.selectedMonth) }
            </div>
            <div className="Calendar-header__arrow Calendar-header__arrow--left">
              &raquo;
            </div>
          </div>

          {this.props.weeks.map(week => (
            <div key={week.week_id} className="Calendar-week">
              { week.days_in_week.map(day => (
                <div key={day.id} className="Calendar-week__day">
                  { day.day_number }
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
