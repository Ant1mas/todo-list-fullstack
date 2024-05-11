'use client'

import { useState } from 'react'

import Modal from '@/components/Modal'
import TaskForm from '@/components/TaskForm'
import { DEFAULT_NEW_TASK } from '@/lib/constants/tasks'

type Props = {}

export default function ButtonAddNewTask({}: Props) {
  const [showModal, setShowModal] = useState<boolean>(false)

  return (
    <>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <TaskForm task={DEFAULT_NEW_TASK} />
      </Modal>
      <button
        className="w-full rounded-2xl bg-blue-400 px-10 py-3 text-sm uppercase text-white duration-150 hover:bg-blue-500 "
        onClick={() => {
          setShowModal(true)
        }}
      >
        Новая задача
      </button>
    </>
  )
}
