import ContextChat from '@/components/context-chat'
import { fireEvent, render, screen } from '@testing-library/react'

const setAdditionalContext = jest.fn()
const handleContextSubmit = jest.fn()

test('renders the first question in the questions prop (part #1)', async () => {
  const questions = [
    'Question #1?',
    'Question #2?',
    'Question #3?',
    'Question #4?',
    'Question #5?',
    'Question #6?',
    'Question #7?',
    'Question #8?',
    'Question #9?'
  ]

  render(
    <ContextChat
      questions={questions}
      setAdditionalContext={setAdditionalContext}
      handleContextSubmit={handleContextSubmit}
      submitted={false}
      bpmnData=""
    />
  )

  const textarea = screen.getByPlaceholderText('Type your message...')
  const textareaTxt = 'Answer #1'
  expect(screen.getByText('Question #1?')).toBeInTheDocument()
  expect(screen.getByRole('answerQuestionForm')).toBeInTheDocument()
  expect(textarea).toBeInTheDocument()
  fireEvent.change(textarea, { target: { value: textareaTxt } })
  expect(textarea).toHaveValue(textareaTxt)
})

test('renders the submit button once all questions are answered', () => {
  render(
    <ContextChat
      questions={[]}
      setAdditionalContext={setAdditionalContext}
      handleContextSubmit={handleContextSubmit}
      submitted={true}
      bpmnData=""
    />
  )

  expect(screen.getByText('Submit')).toBeInTheDocument()
  expect(screen.getByRole('submitContextForm')).toBeInTheDocument()
  fireEvent.submit(screen.getByRole('submitContextForm'))
  expect(screen.getByText('Submitting...')).toBeInTheDocument()
  expect(handleContextSubmit).toHaveBeenCalledTimes(1)
})
