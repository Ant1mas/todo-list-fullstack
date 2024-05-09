'use client'

import { PRIORITIES, STATUSES } from '@/lib/constants/tasks'

import type { Task } from '@/app/tasks/types'

type Props = {
  tasks: Task[]
}

export default function TasksUngrouped({ tasks }: Props) {
  return tasks.map((task: Task) => {
    const priority = PRIORITIES[task.priority]
    const status = STATUSES[task.status]
    const date = new Date(task.finish_at).toLocaleString('ru-ru', {
      hour12: false,
      dateStyle: 'short',
    })
    const time = new Date(task.finish_at).toLocaleString('ru-ru', {
      hour12: false,
      timeStyle: 'short',
    })
    const datetime = `${date} ${time}`
    return (
      <tr key={task.id} onClick={() => {}}>
        <td className="px-2 bg-gray-200">{task.title}</td>
        <td className="px-2">{priority}</td>
        <td className="px-2">{datetime}</td>
        <td className="px-2">{task.responsible_user_id}</td>
        <td className="px-2">{status}</td>
      </tr>
    )
  })
}
