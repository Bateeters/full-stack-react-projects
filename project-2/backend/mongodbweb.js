// Import MongoDB and createServer
import { createServer } from 'node:http'
import { MongoClient } from 'mongodb'

// Define the connection URL and name for the database
const url = 'mongodb://localhost:27017'
const dbName = 'project-2'

// Create a new MongoDB client
const client = new MongoClient(url)

// Connect to the database, log a message for either success or error
try {
  await client.connect()
  console.log('Successfully connected to database!')
} catch (err) {
  console.error('Error connecting to database:', err)
}

// Create the HTTP server
const server = createServer(async (req, res) => {
  // Select the db from the mongoDB client
  const db = client.db(dbName)
  // Select the collection from the db
  const users = db.collection('users')

  // Execute the .find() method on the users collection and the .toArray() method to resolve the iterator to an array
  // basically, run .find() on users and then place it in an array for use
  const usersList = await users.find().toArray()

  // set up the status code and response header
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  // Return the usersList array
  res.end(JSON.stringify(usersList))
})

// Set up the server to listen on localhost:3000 and console log message on start
const host = 'localhost'
const port = 3000
server.listen(port, host, () => {
  console.log(`Server listening on http://${host}:${port}`)
})

// Run terminal command: "node backend/mongodbweb.js" to start server, navigate to localhost:3000 to view
