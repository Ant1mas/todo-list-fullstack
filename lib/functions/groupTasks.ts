import { isThisWeek } from '@/lib/functions/isThisWeek'
import { isToday } from '@/lib/functions/isToday'

import type { GroupBy, Task } from '@/app/tasks/types'
import { isInPast } from '@/lib/functions/isInPast'

export type GroupedTasks = any

export const groupTasks = (
  tasks: Task[] = [],
  groupBy: GroupBy = 'noGroup',
): GroupedTasks => {
  if (groupBy === 'byFinishDate') {
    let groupedByDate: any = {
      today: [],
      week: [],
      later: [],
    }
    tasks.forEach((task: Task) => {
      const finishDate = new Date(task.finish_at)
      if (isToday(finishDate)) {
        groupedByDate.today.push(task)
      } else if (isInPast(finishDate)) {
        groupedByDate.today.push(task)
      } else if (isThisWeek(finishDate)) {
        groupedByDate.week.push(task)
      } else {
        groupedByDate.later.push(task)
      }
    })
    return groupedByDate
  }
  if (groupBy === 'byResponsibleUser') {
    let groupedResponsibleUser: any = {}
    tasks.forEach((task: Task) => {
      if (!groupedResponsibleUser[task.responsible_login]) {
        groupedResponsibleUser[task.responsible_login] = []
      }
      groupedResponsibleUser[task.responsible_login].push(task)
    })
    return groupedResponsibleUser
  }
  return tasks
}
