import TaskRow from '@/components/TaskRow'
import { getUserData } from '@/lib/dataAccessLayer'

import type { Task } from '@/app/tasks/types'

type Props = {
  tasks: Task[]
}

export default async function TasksUngrouped({ tasks }: Props) {
  const userData = await getUserData()

  return tasks.map((task: Task) => {
    return <TaskRow task={task} key={task.id} userData={userData} />
  })
}
