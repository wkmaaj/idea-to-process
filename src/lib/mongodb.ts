import { MongoClient } from 'mongodb'

if (!process.env.MONGODB_URI) {
  throw new Error(
    'Please configure the MongoDB URI in your environment variables'
  )
}

const uri: string = process.env.MONGODB_URI
const options = {}

let client: MongoClient
let clientPromise: Promise<MongoClient>

const globalWithMongo = global as typeof globalThis & {
  _mongoClientPromise: Promise<MongoClient>
}

if (process.env.NODE_ENV === 'development') {
  // using a global variable in development mode to ensure that the
  // MongoClient is only instantiated once
  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options)
    globalWithMongo._mongoClientPromise = client.connect()
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  // production mode
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

// export a module scoped MongoClient
export default clientPromise
