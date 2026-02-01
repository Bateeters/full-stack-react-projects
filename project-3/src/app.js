import express from 'express'

// Creating new Express app
const app = express()

// Define home route
app.get('/', (req, res) => {
  res.send('Hello from Express!')
})

// Export app to use in other files
export { app }
