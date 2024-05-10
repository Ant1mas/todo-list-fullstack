import TaskRow from '@/components/TaskRow'

import type { Task } from '@/app/tasks/types'

type Props = {
  tasks: Task[]
}

export default function TasksUngrouped({ tasks }: Props) {
  return tasks.map((task: Task) => {
    return <TaskRow task={task} />
  })
}
