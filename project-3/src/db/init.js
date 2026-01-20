import mongoose from 'mongoose'

// This funciton will initialize database connection
export function initDatabase() {
  // Define DATABASE_URL to point to our local MongoDB instance currently running
  const DATABASE_URL = 'mongodb://localhost:27017/blog'

  // Then we add a listener to the open event to show a long message once connected
  mongoose.connection.on('open', () => {
    console.log('successfully connected to database:', DATABASE_URL)
  })

  // We then connect to our MongoDB database and return the connection object
  const connection = mongoose.connect(DATABASE_URL)
  return connection
}
