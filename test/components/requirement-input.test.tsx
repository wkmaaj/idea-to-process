import RequirementInput from '@/components/requirement-input'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

test('does not render element when submitted is set to true', () => {
  render(
    <RequirementInput
      userInput={''}
      setUserInput={() => {}}
      submitted={true}
      handleRequirementSubmit={() => {}}
    />
  )
  expect(
    screen.queryByPlaceholderText('Type your requirement here...')
  ).not.toBeInTheDocument()
})

test('renders element when submitted is set to false', () => {
  render(
    <RequirementInput
      userInput={''}
      setUserInput={() => {}}
      submitted={false}
      handleRequirementSubmit={() => {}}
    />
  )
  expect(
    screen.queryByPlaceholderText('Type your requirement here...')
  ).toBeInTheDocument()
})

test('calls handleRequirementSubmit when form is submitted', () => {
  const setUserInput = jest.fn()
  const handleRequirementSubmit = jest.fn()

  render(
    <RequirementInput
      userInput={''}
      setUserInput={setUserInput}
      submitted={false}
      handleRequirementSubmit={handleRequirementSubmit}
    />
  )

  expect(screen.getByText('Submit')).toBeInTheDocument()
  fireEvent.submit(screen.getByRole('form'))
  expect(screen.getByText('Submitting...')).toBeInTheDocument()
  expect(handleRequirementSubmit).toHaveBeenCalledTimes(1)
})

test('updates the input value on change', async () => {
  const setUserInput = jest.fn()
  const handleRequirementSubmit = jest.fn()

  render(
    <RequirementInput
      userInput=""
      setUserInput={setUserInput}
      submitted={false}
      handleRequirementSubmit={handleRequirementSubmit}
    />
  )

  const inputTxt = '¡Hola Mundo!'
  await userEvent.type(
    screen.getByPlaceholderText('Type your requirement here...'),
    inputTxt
  )
  expect(setUserInput).toHaveBeenCalledTimes(inputTxt.length)
  expect(setUserInput).toHaveBeenCalledWith('¡')
})
