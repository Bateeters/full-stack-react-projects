// Do this first before anything else
import dotenv from 'dotenv'
dotenv.config()

import { app } from './app.js'
import { initDatabase } from './db/init.js'

try {
  await initDatabase()
  // Define a port
  const PORT = process.env.PORT

  // Make Express app listen to it
  app.listen(PORT)

  // Log message telling us where the server is running
  console.info(`express server running on http://localhost:${PORT}`)
} catch (err) {
  console.error('error connecting to database:', err)
}

// Add "start": "node src/index.js" to the package.json scripts section
// Run "npm start" in the console
