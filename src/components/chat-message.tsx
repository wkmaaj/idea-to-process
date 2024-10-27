import Markdown from './markdown'
import { Card, CardContent } from './ui'

type ChatMessageProps = { role?: string; content: string }

const ChatMessage: React.FC<ChatMessageProps> = ({ role, content }) => (
  <Card>
    <CardContent
      className={`p-6 text-sm rounded-lg ${
        role === 'Assistant' && 'bg-green-400'
      }`}
    >
      <strong>{role}:</strong> <Markdown content={content} />
    </CardContent>
  </Card>
)

export default ChatMessage
