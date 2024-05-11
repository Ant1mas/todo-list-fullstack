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
  const [showModal, setShowModal] = useState<boolean>(false)
  const priority = PRIORITIES[task.priority]
  const status = STATUSES[task.status]
  const finishDate = dateToString(new Date(task.finish_at))
  const responsibleUserLogin = task.responsible_login
  const taskColor = getTaskColor(task)

  return (
    <>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <TaskForm task={task} />
      </Modal>
      <tr
        key={task.id}
        className="cursor-pointer duration-150 hover:bg-white"
        onClick={() => {
          setShowModal(true)
        }}
      >
        <td
          className={clsx(
            'px-2',
            taskColor === 'gray' ? 'bg-gray-300' : null,
            taskColor === 'green' ? 'bg-green-300' : null,
            taskColor === 'red' ? 'bg-red-300' : null,
          )}
        >
          {task.title}
        </td>
        <td className="px-2 py-1">{priority}</td>
        <td className="px-2">{finishDate}</td>
        <td className="px-2" title={`ID: ${task.responsible_user_id}`}>
          {responsibleUserLogin}
        </td>
        <td className="px-2">{status}</td>
      </tr>
    </>
  )
}
