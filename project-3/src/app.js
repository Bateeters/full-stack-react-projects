import express from 'express'
import bodyParser from 'body-parser'

// Import the API routing funciton
import { postsRoutes } from './routes/posts.js'

// Initializing new Express app (make sure this is first after imports)
const app = express()

// add body-parser plugin as middleware
app.use(bodyParser.json())

// Make sure we call this AFTER initializing the app
postsRoutes(app)

// Define home route
app.get('/', (req, res) => {
  res.send('Hello from Express!')
})

// Export app to use in other files
export { app }
