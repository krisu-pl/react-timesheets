import React, { Component } from 'react'
import { connect } from 'react-redux'

import { setDataFetched, getUsers } from '../actions/calendar'

import '../css/Loading.css'
import '../css/User-select.css'
import '../css/Calendar.css'
import '../css/Controls.css'

class TimesheetsContainer extends Component {
  componentDidMount() {
    this.props.getUsers().then(
      () => {
        this.props.setDataFetched(true)
      },
    )
  }

  render() {
    const loadingSpinner = this.props.isDataFetched ? '' : <div className="Loading" />

    return (
      <div>
        { loadingSpinner }
        <div className="User-select">
          <p className="User-select__label">
            Select user:
          </p>
          <select className="User-select__list">
            <option>- Select user -</option>
            {
              this.props.users.map(user => {
                return <option value={ user.id }>{ user.username }</option>
              })
            }
          </select>
        </div>

        <div className="Calendar">
          <div className="Calendar-header">
            <div className="Calendar-header__arrow Calendar-header__arrow--left">
              &laquo;
            </div>
            <div className="Calendar-header__month">
              March
            </div>
            <div className="Calendar-header__arrow Calendar-header__arrow--left">
              &raquo;
            </div>
          </div>
          <div className="Calendar-week">
            <div className="Calendar-week__day">
              1
            </div>
            <div className="Calendar-week__day Calendar-week__day--green">
              2
              <small>8h</small>
            </div>
            <div className="Calendar-week__day Calendar-week__day--yellow">
              3
            </div>
            <div className="Calendar-week__day Calendar-week__day--red">
              4
            </div>
            <div className="Calendar-week__day">
              5
            </div>
            <div className="Calendar-week__day">
              6
            </div>
            <div className="Calendar-week__day">
              7
            </div>
          </div>
          <div className="Calendar-week Calendar-week--selected">
            <div className="Calendar-week__day">
              1
            </div>
            <div className="Calendar-week__day">
              2
            </div>
            <div className="Calendar-week__day">
              3
            </div>
            <div className="Calendar-week__day">
              4
            </div>
            <div className="Calendar-week__day">
              5
            </div>
            <div className="Calendar-week__day">
              6
            </div>
            <div className="Calendar-week__day">
              7
            </div>
          </div>
        </div>

        <div className="Controls">
          <button className="Controls__button Controls__button--approve">
            Approve
          </button>
          <button className="Controls__button Controls__button--reject">
            Reject
          </button>
        </div>
      </div>
    )
  }
}

const { bool, func } = React.PropTypes

TimesheetsContainer.PropTypes = {
  getUsers: func.isRequired,
  setDataFetched: func,
  isDataFetched: bool,
}

const mapStateToProps = state => ({
  isDataFetched: state.calendar.isDataFetched,
  users: state.calendar.users,
})

const mapDispatchToProps = ({
  setDataFetched,
  getUsers,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TimesheetsContainer)
