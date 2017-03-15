import React, {
  PropTypes,
} from 'react'

import '../css/Controls.css'

const Controls = props => (
  <div className="Controls">
    <button className="Controls__button Controls__button--approve" onClick={props.handleApprove}>
      Approve
    </button>
    <button className="Controls__button Controls__button--reject" onClick={props.handleReject}>
      Reject
    </button>
  </div>
)

Controls.propTypes = {
  handleApprove: PropTypes.func.isRequired,
  handleReject: PropTypes.func.isRequired,
}

Controls.defaultProps = {
}

export default Controls
