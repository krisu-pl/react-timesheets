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
