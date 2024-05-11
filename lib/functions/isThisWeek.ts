export const isThisWeek = (date: Date): boolean => {
  const today: Date = new Date()
  const weekStart: Date = new Date(today)
  const weekEnd: Date = new Date(weekStart)
  weekEnd.setDate(weekStart.getDate() + 6)

  return date >= weekStart && date <= weekEnd
}
