const API_URL = 'https://timesheet-staging-aurity.herokuapp.com/api'

const fetchUsers = () => (
  fetch(`${API_URL}/users`)
)

const getDataForMonth = ({ month, year, userId }) => (
  fetch(`${API_URL}/training/weeks/${month + 1}/${year}/${userId}`)
)

const updateWeek = ({ week, userId }) => {
  const formData = new FormData()
  formData.append('status', week.status)
  return fetch(`${API_URL}/training/weeks/${week.week_id}/users/${userId}`, {
    method: 'put',
    body: formData,
  })
}

const Api = {
  fetchUsers,
  getDataForMonth,
  updateWeek,
}

export default Api
