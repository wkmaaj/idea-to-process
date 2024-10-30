import Markdown from '@/components/markdown'
import { render, screen } from '@testing-library/react'

test('renders the correct content', () => {
  render(<Markdown content="This is a test" />)
  expect(screen.getByText('This is a test')).toBeInTheDocument()
})
