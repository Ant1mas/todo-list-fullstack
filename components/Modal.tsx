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
      className="fixed grid inset-0 bg-black bg-opacity-20 z-40 overflow-y-auto backdrop-blur-sm"
      onClick={(e) => {
        e.stopPropagation()
        onClose()
      }}
    >
      <div className="flex items-center justify-center">
        <div
          className="bg-white p-5 rounded-lg shadow-xl m-4"
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          {children}
          <div className="flex justify-end">
            <button
              onClick={handleCloseClick}
              className="bg-blue-500 hover:bg-blue-700 mt-3 text-white text-sm uppercase py-2 px-4 rounded-xl"
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
