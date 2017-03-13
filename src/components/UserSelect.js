import React, {
  PropTypes,
} from 'react'

const UserSelect = props => (
  <div className="User-select">
    <p className="User-select__label">
      Select user:
    </p>
    <select className="User-select__list" onChange={props.handleUserSelection}>
      <option>- Select user -</option>
      {
        props.users.map(user => (<option key={user.id} value={user.id}>{ user.username }</option>))
      }
    </select>
  </div>
)

UserSelect.propTypes = {
  handleUserSelection: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.object),
}

UserSelect.defaultProps = {
  users: [],
}

export default UserSelect
