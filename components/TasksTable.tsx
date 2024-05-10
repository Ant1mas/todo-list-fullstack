import { getAllTasks } from '@/app/tasks/actions'
import TasksContainer from '@/components/TasksContainer'
import { getUserData } from '@/lib/dataAccessLayer'

import type { Task } from '@/app/tasks/types'

export default async function TasksTable() {
  const tasks: Task[] = await getAllTasks()
  const userData = await getUserData()

  if (tasks.length < 1) {
    return <div>Задач нет</div>
  }

  return (
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
        <TasksContainer tasks={tasks} userData={userData} />
      </tbody>
    </table>
  )
}
