'use client'

import { BpmnModal, Button, ContextChat } from '@/components'
import RequirementInput from '@/components/requirement-input'
import { AdditionalContextType, CoreMessageType } from '@/lib'
import Head from 'next/head'
import { useEffect, useState } from 'react'

/**
 * Homepage (client-side).
 *
 * Route is `${basePath}/`
 */
const HomePage = () => {
  const [userInput, setUserInput] = useState<string>('')
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [responseMessage, setResponseMessage] = useState<string[]>([])
  const [additionalContext, setAdditionalContext] = useState<
    AdditionalContextType[]
  >([])
  const [bpmnData, setBpmnData] = useState<string>('')
  const [coreMessages, setCoreMessages] = useState<CoreMessageType[]>([])
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const handleSubmit = async () => {
    const messages: CoreMessageType[] = [{ role: 'user', content: userInput }]
    additionalContext.forEach((ctxEntry) => {
      messages.push({ role: 'assistant', content: ctxEntry.question })
      messages.push({ role: 'user', content: ctxEntry.answer })
    })
    setCoreMessages(messages)

    try {
      const response = await fetch('/api/llama', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: messages,
          data: { requirement: userInput }
        })
      })

      const data = await response.json()
      console.log(data)
      setBpmnData(data.xml)
    } catch (error) {
      console.error('Error submitting form:', error)
      setResponseMessage(['Error submitting data'])
    }
  }

  const handleStructuredSubmit = async () => {
    console.log('User input:', userInput)

    try {
      const response = await fetch('/api/llama/structured', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: [{ role: 'user', content: userInput }],
          data: { contextPrompt: true }
        })
      })

      setSubmitted(true)

      const data = await response.json()
      console.log(data)
      if (response.ok) {
        console.log(data.context)
        setResponseMessage(data.context.questions)
      } else {
        setResponseMessage([`Something went wrong: ${data}`])
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setResponseMessage(['Error submitting data'])
    }
  }

  const handleReset = () => {
    setUserInput('')
    setSubmitted(false)
  }

  useEffect(() => {
    if (bpmnData) {
      setIsModalOpen(true)
    }
  }, [bpmnData])

  return (
    <>
      <Head>
        <title>Idea to Process Homepage</title>
        <meta
          name="description"
          content="Welcome to the Idea to Process homepage."
        />
      </Head>

      <main className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100 gap-4">
        <header className="text-center">
          <h1 className="text-5xl font-bold">Welcome to Idea to Process</h1>
          <p className="mt-2 mb-4 text-lg text-gray-600">
            Lets turn your idea into a (business) process (model).
          </p>
        </header>
        {isModalOpen ? (
          <section>
            <BpmnModal
              diagramXml={bpmnData}
              messages={coreMessages}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
          </section>
        ) : (
          <section className="w-[95%]">
            {submitted ? (
              <ContextChat
                questions={responseMessage}
                setAdditionalContext={setAdditionalContext}
                submitted={submitted}
                handleContextSubmit={handleSubmit}
                bpmnData={bpmnData}
              />
            ) : (
              <RequirementInput
                userInput={userInput}
                setUserInput={setUserInput}
                submitted={submitted}
                handleRequirementSubmit={handleStructuredSubmit}
              />
            )}
            <div className="flex flex-col items-center mt-8">
              <Button onClick={handleReset}>Reset</Button>
            </div>
          </section>
        )}

        <footer className="mt-auto">
          <p className="text-gray-500">&copy; 2024 Idea to Process</p>
        </footer>
      </main>
    </>
  )
}

export default HomePage
