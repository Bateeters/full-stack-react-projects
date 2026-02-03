import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

// Import the API routing funciton
import { postsRoutes } from './routes/posts.js'

// Initializing new Express app (make sure this is first after imports)
const app = express()

// add plugins as middleware
app.use(cors())
app.use(bodyParser.json())

// Make sure we call this AFTER initializing the app
postsRoutes(app)

// Define home route
app.get('/', (req, res) => {
  res.send('Hello from Express!')
})

// Export app to use in other files
export { app }
