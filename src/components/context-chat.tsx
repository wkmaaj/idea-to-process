'use client'

import { AdditionalContextType } from '@/lib'
import { CornerDownLeft, Loader2 } from 'lucide-react'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import ChatMessage from './chat-message'
import { Button, Textarea } from './ui'

type ContextChatProps = {
  questions: string[]
  setAdditionalContext: Dispatch<SetStateAction<AdditionalContextType[]>>
  handleContextSubmit: () => Promise<void>
  submitted: boolean
  bpmnData: string
}

const ContextChat: React.FC<ContextChatProps> = ({
  questions,
  setAdditionalContext,
  handleContextSubmit,
  submitted,
  bpmnData
}) => {
  const [text, setText] = useState<string>('')
  const [messages, setMessages] = useState<AdditionalContextType[]>([])
  const [currentQuestion, setCurrentQuestion] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSubmit = () => {
    if (text.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { question: currentQuestion, answer: text }
      ])
      setText('')
    }
  }

  useEffect(() => {
    setCurrentQuestion(questions.shift()!)
    if (questions.length === 0) {
      setAdditionalContext(messages)
    }
  }, [questions, messages, setAdditionalContext])

  useEffect(() => {
    setIsLoading(false)
  }, [bpmnData])

  return (
    <div className="flex flex-col w-full">
      {/* Chat window */}
      <div className="flex-1" />
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          {messages.map((message, i) => (
            <>
              <ChatMessage
                key={`question-${i}`}
                content={message.question}
                role="Assistant"
              />
              <ChatMessage
                key={`answer-${i}`}
                content={message.answer}
                role="User"
              />
            </>
          ))}
          {currentQuestion && (
            <ChatMessage
              key={`current-question`}
              content={currentQuestion}
              role="Assistant"
            />
          )}
        </div>

        {/* Form to send a new message */}
        {currentQuestion && (
          <form
            className="w-full overflow-hidden rounded-lg border bg-background"
            onSubmit={(e) => {
              // default behavior of form submission reloads the page and processes the input data
              e.preventDefault()
              handleSubmit()
            }}
            role="answerQuestionForm"
          >
            <div>
              <Textarea
                className="min-h-12 w-full resize-none border-5 p-3 shadow-none"
                value={text}
                onChange={(e) => setText(e.target.value)} //update the text state
                rows={4}
                cols={50}
                placeholder="Type your message..."
              />
            </div>
            <div className="flex items-center p-3 pt-2">
              <Button
                type="submit"
                className="ml-auto"
                size={'sm'}
              >
                Answer <CornerDownLeft className="size-3.5" />
              </Button>
            </div>
          </form>
        )}
        {submitted && !currentQuestion && (
          <form
            onSubmit={(e) => {
              // default behavior of form submission reloads the page and processes the input data
              e.preventDefault()
              setIsLoading(true)
              handleContextSubmit()
            }}
            className="flex flex-col items-center mt-4 space-y-4"
            role="submitContextForm"
          >
            <Button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              disabled={isLoading}
            >
              {isLoading ? 'Submitting...' : 'Submit'}
              <span className="px-1">
                {isLoading ? (
                  <Loader2 className="size-3.5 animate-spin" />
                ) : (
                  <CornerDownLeft className="size-3.5" />
                )}
              </span>
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}

export default ContextChat
