import Modal from '@/components/modal'
import { fireEvent, render, screen } from '@testing-library/react'

test('renders correctly with closeOnOutClick disabled', () => {
  const onClose = jest.fn()

  render(
    <Modal
      isOpen={true}
      onClose={onClose}
      closeOnOutClick={false}
    >
      <div></div>
    </Modal>
  )

  const btn = screen.getByText('X')
  expect(btn).toBeInTheDocument()
  fireEvent.click(screen.getByRole('outerDiv'))
  expect(onClose).toHaveBeenCalledTimes(0)
  fireEvent.click(btn)
  expect(onClose).toHaveBeenCalledTimes(1)
})

test('renders correctly with closeOnOutClick enabled', () => {
  const onClose = jest.fn()

  render(
    <Modal
      isOpen={true}
      onClose={onClose}
      closeOnOutClick={true}
    >
      <div></div>
    </Modal>
  )

  const btn = screen.getByText('X')
  expect(btn).toBeInTheDocument()
  fireEvent.click(screen.getByRole('outerDiv'))
  expect(onClose).toHaveBeenCalledTimes(1)
  fireEvent.click(btn)
  expect(onClose).toHaveBeenCalledTimes(2)
})

test('does not render when isOpen is false', () => {
  const { container } = render(
    <Modal
      isOpen={false}
      onClose={jest.fn()}
      closeOnOutClick={true}
    >
      <div></div>
    </Modal>
  )

  expect(container).toBeEmptyDOMElement()
})
