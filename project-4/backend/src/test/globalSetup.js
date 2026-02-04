import { MongoMemoryServer } from 'mongodb-memory-server'

// Define a globalSetup(), this creates a memory server for MongoDB
export default async function globalSetup() {
  const instance = await MongoMemoryServer.create()

  // Store the MongoDB isntance as a global variable to access it later in globalTeardown()
  global.__MONGOINSTANCE = instance

  // Store the URL to connect to our test instance in DATABASE_URL environment variable
  process.env.DATABASE_URL = instance.getUri()
}
