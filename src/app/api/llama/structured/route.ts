import { CoreMessage, generateObject } from 'ai'
import { ollama } from 'ollama-ai-provider'
import { z } from 'zod'
import { contextPrompt002 as contextPrompt, systemPrompt } from '../prompt'

export const POST = async (req: Request) => {
  const body: {
    messages: CoreMessage[]
    data: { [key: string]: string }
  } = await req.json()

  const prompt = contextPrompt(
    body.messages[body.messages.length - 1].content as string
  )

  const schema = z.object({
    context: z
      .object({
        questions: z
          .array(z.string())
          .describe(
            'An array of questions that will help provide additional context to the LLM'
          )
      })
      .describe(
        'An object representing the additional context needed for the LLM to generate desired output'
      )
  })

  const model = ollama(process.env.OLLAMA_MODEL!)
  const result = await generateObject({
    model,
    system: systemPrompt(),
    schemaName: 'AdditionalContext',
    schemaDescription: 'Questions to provide additional context for LLM',
    schema,
    prompt
  })

  console.log(result.object)

  return Response.json(result.object)
}
