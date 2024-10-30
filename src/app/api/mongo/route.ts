import { IdeasDocumentType, RequestBody, mongoClient } from '@/lib'
import { Collection, Document } from 'mongodb'
import { NextResponse } from 'next/server'

const determineVersion = async (
  requirement: string,
  collection: Collection<Document>
) => {
  const currentVersion = await collection.countDocuments({ requirement })
  return currentVersion + 1
}

export const GET = async () => {
  try {
    const client = await mongoClient
    const db = client.db('idea-to-process')
    const collection = db.collection('Ideas')
    const data = await collection.find({}).toArray()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    return NextResponse.json({ message: 'Error getting data' }, { status: 500 })
  }
}

export const POST = async (req: Request) => {
  try {
    const body: RequestBody = await req.json()
    console.log(body)

    const requirement = body.context.shift()?.content ?? ''
    if (!requirement) {
      return NextResponse.json(
        { message: 'Required information is missing' },
        { status: 400 }
      )
    }

    const client = await mongoClient
    const db = client.db('idea-to-process')
    const collection = db.collection('Ideas')
    const version = await determineVersion(requirement, collection)

    const document: IdeasDocumentType = {
      requirement,
      category: body.category,
      context: body.context,
      bpmnXml: body.bpmnXml,
      version,
      createdAt: new Date()
    }
    console.log('Saving document')
    await collection.insertOne(document)

    return NextResponse.json(
      { message: 'Input received successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    return NextResponse.json({ message: 'Error saving input' }, { status: 500 })
  }
}
