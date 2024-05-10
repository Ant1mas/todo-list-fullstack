import { isInPast } from '@/lib/functions/isInPast'

import type { Task } from '@/app/tasks/types'

type ResultColor = 'gray' | 'green' | 'red'

export const getTaskColor = (task: Task): ResultColor => {
  let resultColor: ResultColor = 'gray'
  const isOutdated = isInPast(new Date(task.finish_at))
  if (task.status === 'done') {
    resultColor = 'green'
  } else if (
    (task.status === 'to do' || task.status === 'in progress') &&
    isOutdated
  ) {
    resultColor = 'red'
  }
  return resultColor
}
