import React, {
  PropTypes,
} from 'react'

const Controls = props => (
  <div className="Controls">
    <button className="Controls__button Controls__button--approve">
      Approve
    </button>
    <button className="Controls__button Controls__button--reject">
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
