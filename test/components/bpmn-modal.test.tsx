import BpmnModal from '@/components/bpmn-modal'
import { render, screen } from '@testing-library/react'

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPathL: ''
    }
  }
}))

const setIsModalOpen = jest.fn()

test('renders with default props correctly', () => {
  render(
    <BpmnModal
      diagramXml=""
      messages={[]}
      isModalOpen={false}
      setIsModalOpen={setIsModalOpen}
    />
  )

  expect(screen.getByText('BPMN Flow Diagram Example')).toBeInTheDocument()
  expect(screen.getByText('Open Modal')).toBeInTheDocument()
  expect(screen.getByText('Open Modal')).toHaveClass('bg-blue-500')
})

test('renders with specified props correctly', () => {
  render(
    <BpmnModal
      diagramXml=""
      messages={[]}
      isModalOpen={false}
      setIsModalOpen={setIsModalOpen}
      showHeading={false}
      buttonColor="bg-green-600"
      buttonText="View"
      closeOnOutClick={true}
    />
  )

  expect(
    screen.queryByText('BPMN Flow Diagram Example')
  ).not.toBeInTheDocument()
  expect(screen.getByText('View')).toBeInTheDocument()
  expect(screen.getByText('View')).toHaveClass('bg-green-600')
})
