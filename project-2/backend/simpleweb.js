import { createServer } from 'node:http'

// Start setting up the server
const server = createServer((req, res) => {
  // Set the status code as 200
  res.statusCode = 200

  // Set content type to text/plain so the browser knows what kind of respons it will receive
  res.setHeader('Content-Type', 'text/plain')

  // End the request by returning a Hello World string in the response
  res.end('Hello HTTP world!')
})

// Define host and port to know where to listen
const host = 'localhost'
const port = 3000

// Log a message to know the server is running
server.listen(port, host, () => {
  console.log(`Server listening on http://${host}:${port}`)
})
