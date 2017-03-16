export const WEEK_STATUS = {
  APPROVED: 'approved',
  REJECTED: 'rejected',
}

export const sortWeeks = (w1, w2) => {
  if (w1.week_id < w2.week_id) {
    return -1
  }
  if (w1.week_id > w2.week_id) {
    return 1
  }
  return 0
}

export const sortWeekDays = (d1, d2) => {
  if (d1.id < d2.id) {
    return -1
  }
  if (d1.id > d2.id) {
    return 1
  }
  return 0
}

export const findWeekById = (list, id) => list.find(week => week.week_id === id)

export const setWeekStatus = (week, status) => ({ ...week, status })

export const updateWeeksList = (list, updatedWeek) => {
  const updatedIndex = list.findIndex(week => week.week_id === updatedWeek.week_id)
  return [
    ...list.slice(0, updatedIndex),
    updatedWeek,
    ...list.slice(updatedIndex + 1),
  ]
}
