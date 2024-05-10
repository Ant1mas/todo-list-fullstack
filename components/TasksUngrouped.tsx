'use client'

import TaskRow from '@/components/TaskRow'

import type { Task } from '@/app/tasks/types'

type Props = {
  tasks: Task[]
  userData: any
}

export default function TasksUngrouped({ tasks, userData }: Props) {
  return tasks.map((task: Task) => {
    return <TaskRow task={task} key={task.id} userData={userData} />
  })
}
