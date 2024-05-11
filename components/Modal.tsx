'use client'

import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

type Props = {
  show: boolean
  onClose: () => void
  children: React.ReactNode
}

export default function Modal({ show = false, onClose, children }: Props) {
  const [isBrowser, setIsBrowser] = useState<boolean>(false)

  useEffect(() => {
    setIsBrowser(true)
  }, [])

  const handleCloseClick = (e: any) => {
    e.preventDefault()
    onClose()
  }

  const modalContent = show ? (
    <div
      className="fixed inset-0 z-40 grid overflow-y-auto bg-black bg-opacity-20 backdrop-blur-sm"
      onClick={(e) => {
        e.stopPropagation()
        onClose()
      }}
    >
      <div className="flex items-center justify-center">
        <div
          className="m-4 rounded-lg bg-white p-5 shadow-xl"
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          {children}
          <div className="flex justify-end">
            <button
              onClick={handleCloseClick}
              className="mt-3 rounded-xl bg-blue-500 px-4 py-2 text-sm uppercase text-white hover:bg-blue-700"
            >
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null

  if (isBrowser) {
    const modalRoot = document?.getElementById('modal-root')
    if (modalRoot) {
      return ReactDOM.createPortal(modalContent, modalRoot)
    } else {
      console.error('Modal root element not found')
      return null
    }
  } else {
    return null
  }
}
