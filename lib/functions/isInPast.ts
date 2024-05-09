export const isInPast = (date: Date): boolean => {
  const today = new Date()
  return date.getTime() < today.getTime()
}
