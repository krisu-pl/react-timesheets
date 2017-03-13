const API_URL = 'https://timesheet-staging-aurity.herokuapp.com/api'

const fetchUsers = () => (
  fetch(`${API_URL}/users`)
)

const getDataForMonth = ({ month, year, userId }) => (
  fetch(`${API_URL}/training/weeks/${month}/${year}/${userId}`)
)

const Api = {
  fetchUsers,
  getDataForMonth,
}

export default Api
