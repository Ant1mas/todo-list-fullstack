'use client'

import clsx from 'clsx'

import { PRIORITIES, STATUSES } from '@/lib/constants/tasks'
import { getTaskColor } from '@/lib/functions/getTaskColor'

import type { Task } from '@/app/tasks/types'

type Props = {
  task: Task
}

export default function TaskRow({ task }: Props) {
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
  const responsibleUserLogin = task.login
  const taskColor = getTaskColor(task)

  return (
    <tr
      key={task.id}
      onClick={() => {
        console.log(`Clicked task id${task.id}`)
        console.log(task)
      }}
    >
      <td
        className={clsx(
          'px-2',
          taskColor === 'gray' ? 'bg-gray-200' : null,
          taskColor === 'green' ? 'bg-green-200' : null,
          taskColor === 'red' ? 'bg-red-200' : null,
        )}
      >
        {task.title}
      </td>
      <td className="px-2">{priority}</td>
      <td className="px-2">{datetime}</td>
      <td className="px-2" title={`ID: ${task.responsible_user_id}`}>
        {responsibleUserLogin}
      </td>
      <td className="px-2">{status}</td>
    </tr>
  )
}
