import ChatMessage from '@/components/chat-message'
import { render, screen } from '@testing-library/react'

test('renders the expected content', () => {
  const content = 'Hi there'

  render(
    <ChatMessage
      role="User"
      content={content}
    />
  )

  const chatMessage = screen.getByText(content)
  expect(chatMessage).toBeInTheDocument()
})

test('applies the class for role Assistant', () => {
  const content = 'Hi there'

  render(
    <ChatMessage
      role="Assistant"
      content={content}
    />
  )

  const cardContent = screen.getByText(/Assistant:/i).parentElement
  expect(cardContent).toHaveClass('bg-green-400')
})

test('does not apply the class for non-Assistant role(s)', () => {
  const content = 'Hi there'

  render(
    <ChatMessage
      role="User"
      content={content}
    />
  )

  const cardContent = screen.getByText(/User:/i).parentElement
  expect(cardContent).not.toHaveClass('bg-green-400')
})
