import express from 'express'

// Import the API routing funciton
import { postsRoutes } from './routes/posts.js'

// Initializing new Express app
const app = express()

// Make sure we call this AFTER initializing the app
postsRoutes(app)

// Define home route
app.get('/', (req, res) => {
  res.send('Hello from Express!')
})

// Export app to use in other files
export { app }
