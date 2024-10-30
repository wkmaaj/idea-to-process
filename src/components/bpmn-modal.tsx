'use client'

import { CoreMessageType } from '@/lib'
import { CornerDownLeft, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useState } from 'react'
import BpmnVisualizer from './bpmn-visualizer'
import CategoryDropdown from './category-dropdown'
import CoreMessageTable from './core-message-table'
import Modal from './modal'
import { Button } from './ui'

type BpmnModalProps = {
  diagramXml: string
  messages: CoreMessageType[]
  isModalOpen: boolean
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
  showHeading?: boolean
  buttonText?: string
  buttonColor?: string
  closeOnOutClick?: boolean
  category?: string
  isHistoryPage?: boolean
}

const BpmnModal: React.FC<BpmnModalProps> = ({
  diagramXml,
  messages,
  isModalOpen,
  setIsModalOpen,
  showHeading = true,
  buttonText = 'Open Modal',
  buttonColor = 'bg-blue-500',
  closeOnOutClick = false,
  category = '',
  isHistoryPage = false
}) => {
  const [data, setData] = useState<CoreMessageType[]>(messages)
  const [selectedCategory, setSelectedCategory] = useState<string>(category)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const router = useRouter()

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleDataUpdate = (updatedData: CoreMessageType[]) => {
    setData(updatedData)
  }

  const handleSave = async () => {
    setIsLoading(true)
    setSuccessMessage(null)
    setErrorMessage(null)
    console.log('Saving data')

    try {
      const response = await fetch('/api/mongo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          context: data,
          category: selectedCategory || 'To be implemented',
          bpmnXml: diagramXml
        })
      })

      if (!response.ok) {
        throw new Error('Failed to save data')
      }
      if (isHistoryPage) {
        setIsModalOpen(false)
        window.location.reload()
      } else {
        router.push('/history')
      }
    } catch (error) {
      console.error('Error saving data:', error)
      router.push('/error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center max-w-2xl mx-auto my-2">
      {showHeading && (
        <h2 className="text-2xl font-bold mb-4">BPMN Flow Diagram Example</h2>
      )}
      <Button
        onClick={openModal}
        className={`${buttonColor} text-white px-4 py-2 rounded items-center`}
        disabled={messages.length === 0}
      >
        {buttonText}
      </Button>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        closeOnOutClick={closeOnOutClick}
      >
        <div className="flex flex-col gap-8">
          <div className="flex flex-col">
            <h3 className="text-xl font-bold mb-4">Flow Diagram</h3>
            <BpmnVisualizer diagramXml={diagramXml} />
          </div>
          <div className="flex flex-col">
            <h3 className="text-xl font-bold mb-4">Information</h3>
            <CoreMessageTable
              data={data}
              onDataUpdate={handleDataUpdate}
            />
          </div>
          <div className="flex justify-center">
            <CategoryDropdown
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>
          <div className="flex justify-end">
            <Button
              className="bg-green-500 m-4"
              onClick={handleSave}
              disabled={isLoading}
              type="submit"
              size={'lg'}
              variant={'secondary'}
            >
              {isLoading ? 'Saving...' : 'Save'}
              <span className="px-1">
                {isLoading ? (
                  <Loader2 className="size-3.5 animate-spin" />
                ) : (
                  <CornerDownLeft className="size-3.5" />
                )}
              </span>
            </Button>
          </div>
          {successMessage && (
            <div className="text-green-500 mt-2 text-center">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="text-red-500 mt-2 text-center">{errorMessage}</div>
          )}
        </div>
      </Modal>
    </div>
  )
}

export default BpmnModal
