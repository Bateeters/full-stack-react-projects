import { createServer } from 'node:http'
import { readFileSync } from 'node:fs'

// Start setting up the server
const server = createServer((req, res) => {
  // Set the status code as 200
  res.statusCode = 200

  // Set content type to application/json so the browser knows what kind of respons it will receive
  res.setHeader('Content-Type', 'application/json')

  // End the request by returning the JSON string from users.json
  // We don't need to parse here as res.end() expects a string anyway
  res.end(readFileSync('backend/users.json'))
})

// Define host and port to know where to listen
const host = 'localhost'
const port = 3000

// Log a message to know the server is running
server.listen(port, host, () => {
  console.log(`Server listening on http://${host}:${port}`)
})

// run "node backend/webfiles.js" in the console and navigate to localhost:3000 to see the data displayed
