import TasksGroupedByFinish from '@/components/TasksGroupedByFinish'
import TasksGroupedByResponsibleUser from '@/components/TasksGroupedByResponsibleUser'
import TasksUngrouped from '@/components/TasksUngrouped'
import { groupTasks } from '@/lib/functions/groupTasks'

import type { GroupBy, Task } from '@/app/tasks/types'

type Props = {
  tasks: Task[]
  groupBy: GroupBy
}

export default function TasksList({ tasks, groupBy }: Props) {
  const groupedTasks = groupTasks(tasks, groupBy)

  if (tasks.length < 1) {
    return <div>Задач нет</div>
  }

  return (
    <>
      <table className="w-full my-4">
        <thead>
          <tr className="text-left">
            <th className="px-2">Заголовок</th>
            <th className="px-2">Приоритет</th>
            <th className="px-2">Дата окончания</th>
            <th className="px-2">Ответственный</th>
            <th className="px-2">Статус</th>
          </tr>
        </thead>
        <tbody>
          {groupBy === 'noGroup' && <TasksUngrouped tasks={groupedTasks} />}
          {groupBy === 'byFinishDate' && (
            <TasksGroupedByFinish tasks={groupedTasks} />
          )}
          {groupBy === 'byResponsibleUser' && (
            <TasksGroupedByResponsibleUser tasks={groupedTasks} />
          )}
        </tbody>
      </table>
    </>
  )
}
