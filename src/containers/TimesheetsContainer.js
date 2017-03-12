import React, { Component } from 'react'
import { connect } from 'react-redux'

import { setDataFetched, getUsers } from '../actions/calendar'

class TimesheetsContainer extends Component {
  componentDidMount() {
    this.props.getUsers().then(
      () => {
        this.props.setDataFetched(true)
      },
    )
  }

  render() {
    return (
      <div>
        <p>
          { this.props.isDataFetched ? 'Data loaded' : 'Loading...'}
        </p>
        {
          this.props.users.map(user => {
            return <p> { user.username } value={ user.id } </p>
          })
        }
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
