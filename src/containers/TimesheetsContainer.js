import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import {
  setDataFetched,
  getUsers,
  selectUser,
} from '../actions/users'

import {
  selectMonth,
  getDataForMonth,
  selectWeek,
  updateWeeks,
  postUpdatedWeek,
} from '../actions/calendar'

import '../css/Loading.css'
import '../css/Popup-message.css'

import UserSelect from '../components/UserSelect'
import Controls from '../components/Controls'
import CalendarContainer from './CalendarContainer'

import {
  WeekStatus,
  findWeekById,
  setWeekStatus,
  updateWeeksList,
} from '../utils/calendar'

class TimesheetsContainer extends Component {
  constructor() {
    super()

    this.handleApprove = this.handleApprove.bind(this)
    this.handleReject = this.handleReject.bind(this)
    this.handleUserSelection = this.handleUserSelection.bind(this)
    this.changeWeekStatus = this.changeWeekStatus.bind(this)
  }

  componentDidMount() {
    this.props.getUsers().then(
      () => {
        this.props.setDataFetched(true)
      },
    )
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

  handleUserSelection(event) {
    const userId = parseInt(event.target.value, 10)
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

    return (
      <div>
        { loadingSpinner }
        { popupMessage }

        <UserSelect
          handleUserSelection={this.handleUserSelection}
          users={this.props.users}
        />

        <CalendarContainer />

        <Controls
          handleApprove={this.handleApprove}
          handleReject={this.handleReject}
        />
      </div>
    )
  }
}

TimesheetsContainer.propTypes = {
  getUsers: PropTypes.func.isRequired,
  selectUser: PropTypes.func.isRequired,
  selectMonth: PropTypes.func.isRequired,
  getDataForMonth: PropTypes.func.isRequired,
  setDataFetched: PropTypes.func.isRequired,
  updateWeeks: PropTypes.func.isRequired,
  postUpdatedWeek: PropTypes.func.isRequired,
  isDataFetched: PropTypes.bool.isRequired,
  popupMessage: PropTypes.string,
  selectedWeek: PropTypes.number,
  selectedUser: PropTypes.number,
  weeks: PropTypes.arrayOf(PropTypes.object).isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
}

TimesheetsContainer.defaultProps = {
  popupMessage: null,
  selectedWeek: null,
  selectedUser: null,
}

const mapStateToProps = state => ({
  isDataFetched: state.users.isDataFetched,
  users: state.users.users,
  selectedUser: state.users.selectedUser,
  weeks: state.calendar.weeks,
  selectedMonth: state.calendar.selectedMonth,
  selectedYear: state.calendar.selectedYear,
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
