'use client'

import clsx from 'clsx'
import { useState } from 'react'

import { PRIORITIES, STATUSES } from '@/lib/constants/tasks'
import { getTaskColor } from '@/lib/functions/getTaskColor'

import type { Task } from '@/app/tasks/types'
import Modal from '@/components/Modal'

type Props = {
  task: Task
}

export default function TaskRow({ task }: Props) {
  const [showModal, setShowModal] = useState(false)
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
    <>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <p>This is modal content!</p>
      </Modal>
      <tr
        key={task.id}
        className="cursor-pointer duration-150 hover:bg-gray-50"
        onClick={() => {
          setShowModal(true)
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
        <td className="px-2 py-1">{priority}</td>
        <td className="px-2">{datetime}</td>
        <td className="px-2" title={`ID: ${task.responsible_user_id}`}>
          {responsibleUserLogin}
        </td>
        <td className="px-2">{status}</td>
      </tr>
    </>
  )
}
