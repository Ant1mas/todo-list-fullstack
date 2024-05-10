'use client'

import clsx from 'clsx'
import { useState } from 'react'

import Modal from '@/components/Modal'
import TaskForm from '@/components/TaskForm'
import { PRIORITIES, STATUSES } from '@/lib/constants/tasks'
import { dateToString } from '@/lib/functions/dateToString'
import { getTaskColor } from '@/lib/functions/getTaskColor'

import type { Task } from '@/app/tasks/types'

type Props = {
  task: Task
}

export default function TaskRow({ task }: Props) {
  const [taskState, setTaskState] = useState<Task>(task)
  const [showModal, setShowModal] = useState<boolean>(false)
  const priority = PRIORITIES[taskState.priority]
  const status = STATUSES[taskState.status]
  const finishDate = dateToString(new Date(taskState.finish_at))
  const responsibleUserLogin = taskState.responsible_login
  const taskColor = getTaskColor(taskState)

  return (
    <>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <TaskForm
          task={taskState}
          onUpdate={(updatedState) => {
            setTaskState(updatedState)
          }}
        />
      </Modal>
      <tr
        key={taskState.id}
        className="cursor-pointer duration-150 hover:bg-gray-50"
        onClick={() => {
          setShowModal(true)
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
          {taskState.title}
        </td>
        <td className="px-2 py-1">{priority}</td>
        <td className="px-2">{finishDate}</td>
        <td className="px-2" title={`ID: ${taskState.responsible_user_id}`}>
          {responsibleUserLogin}
        </td>
        <td className="px-2">{status}</td>
      </tr>
    </>
  )
}
