/**
 * API endpoint exposed server-side to interact with Llama AI (or LLM 🤷🏻‍♂️).
 *
 * Route is `${basePath}/api/llama`
 */

import { CoreMessage, generateObject } from 'ai'
import { ollama } from 'ollama-ai-provider'
import { z } from 'zod'
import { bpmnPrompt001 as bpmnPrompt, systemPrompt } from './prompt'

export const POST = async (req: Request) => {
  const body: {
    messages: CoreMessage[]
    data: { [key: string]: string }
  } = await req.json()

  const model = ollama(process.env.OLLAMA_MODEL!)
  const schema = z.object({
    xml: z.string(),
    explanation: z.string().optional()
  })

  body.messages.push({
    role: 'user',
    content: bpmnPrompt(body.data.requirement)
  })
  console.log(body.messages)

  const result = await generateObject({
    model,
    system: systemPrompt(),
    schemaName: 'Xml',
    schemaDescription: 'BPMN XML generated by LLM',
    schema,
    messages: body.messages
  })

  console.log(result.object)

  return Response.json(result.object)
}
