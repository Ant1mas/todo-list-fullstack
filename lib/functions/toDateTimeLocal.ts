export const toDateTimeLocal = (date: Date): string => {
  const newDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
  return newDate.toISOString().slice(0, 16)
}
