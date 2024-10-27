import { ReactNode } from 'react'
import { Button } from './ui'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  closeOnOutClick: boolean
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  closeOnOutClick
}) => {
  if (!isOpen) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={() => {
        if (closeOnOutClick) {
          onClose()
        }
      }}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-[92.5%] h-[92.5%] max-h-screen overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          className="fixed top-2 right-4 z-10"
          variant={'default'}
          onClick={onClose}
        >
          X
        </Button>
        {children}
      </div>
    </div>
  )
}

export default Modal
