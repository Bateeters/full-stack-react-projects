import { app } from './app.js'

// Define a port
const PORT = 3000

// Make Express app listen to it
app.listen(PORT)

// Log message telling us where the server is running
console.info(`express server running on http://localhost:${PORT}`)

// Add "start": "node src/index.js" to the package.json scripts section
// Run "npm start" in the console
