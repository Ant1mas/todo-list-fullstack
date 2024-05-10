'use client'

import { useState } from 'react'

import Modal from '@/components/Modal'
import TaskForm from '@/components/TaskForm'
import { DEFAULT_NEW_TASK } from '@/lib/constants/tasks'

type Props = {
  userData?: object
}

export default function ButtonAddNewTask({ userData }: Props) {
  const [showModal, setShowModal] = useState<boolean>(false)

  return (
    <>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <TaskForm task={DEFAULT_NEW_TASK} userData={userData} />
      </Modal>
      <button
        className="w-full bg-blue-400 text-white uppercase text-sm px-10 py-3 rounded-2xl duration-150 hover:bg-blue-500"
        onClick={() => {
          setShowModal(true)
        }}
      >
        Добавить новую задачу
      </button>
    </>
  )
}
