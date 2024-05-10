export const dateToString = (dateObj: Date): string => {
  const date = new Date(dateObj).toLocaleString('ru-ru', {
    hour12: false,
    dateStyle: 'short',
  })
  const time = new Date(dateObj).toLocaleString('ru-ru', {
    hour12: false,
    timeStyle: 'short',
  })
  const datetime = `${date} ${time}`
  return datetime
}
