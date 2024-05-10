import React from 'react'

import TaskRow from '@/components/TaskRow'
import { getUserData } from '@/lib/dataAccessLayer'

import type { Task } from '@/app/tasks/types'

type Props = {
  tasks: { [key: string]: Task[] }
}

export default async function TasksGroupedByResponsibleUser({ tasks }: Props) {
  const userData = await getUserData()

  return Object.keys(tasks).map((responsibleUser) => (
    <React.Fragment key={responsibleUser}>
      <tr>
        <td colSpan={5} className="text-center font-bold pt-3">
          {responsibleUser}
        </td>
      </tr>
      {tasks[responsibleUser].map((task) => {
        return <TaskRow task={task} key={task.id} userData={userData} />
      })}
    </React.Fragment>
  ))
}
