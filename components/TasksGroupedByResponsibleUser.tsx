'use client'

import React from 'react'

import TaskRow from '@/components/TaskRow'

import type { Task } from '@/app/tasks/types'

type Props = {
  tasks: { [key: string]: Task[] }
}

export default function TasksGroupedByResponsibleUser({ tasks }: Props) {
  return Object.keys(tasks).map((responsibleUser) => (
    <React.Fragment key={responsibleUser}>
      <tr>
        <td colSpan={5} className="pt-3 text-center font-bold">
          {responsibleUser}
        </td>
      </tr>
      {tasks[responsibleUser].map((task) => {
        return <TaskRow task={task} key={task.id} />
      })}
    </React.Fragment>
  ))
}
