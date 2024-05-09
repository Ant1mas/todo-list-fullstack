'use client'

import type { Task } from '@/app/tasks/types'
import { PRIORITIES, STATUSES } from '@/lib/constants/tasks'
import React from 'react'

type Props = {
  tasks: { [key: string]: Task[] }
}

export default function TasksGroupedByResponsibleUser({ tasks }: Props) {
  return Object.keys(tasks).map((responsibleUser) => (
    <React.Fragment key={responsibleUser}>
      <tr>
        <td colSpan={5} className="text-center font-bold pt-3">
          {responsibleUser}
        </td>
      </tr>
      {tasks[responsibleUser].map((task) => {
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
      })}
    </React.Fragment>
  ))
}
