import TasksContainer from '@/components/TasksContainer'
import { getAllTasks } from '@/lib/actions/tasks'
import { getSubordinatesById } from '@/lib/actions/users'
import { getUserData } from '@/lib/dataAccessLayer'

import type { Task } from '@/app/tasks/types'

export default async function TasksTable() {
  const tasks: Task[] = await getAllTasks()
  const userData = await getUserData()
  const subordinates = (await getSubordinatesById(userData.id)) || []

  if (tasks.length < 1) {
    return <div>Задач нет</div>
  }

  return (
    <table className="my-4 w-full">
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
        <TasksContainer
          tasks={tasks}
          userData={userData}
          subordinates={subordinates}
        />
      </tbody>
    </table>
  )
}
