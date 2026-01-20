import { initDatabase } from './db/init.js'
import { Post } from './db/models/post.js'

// initDatabase is an async function so we need to await it
// This makes sure we are connected to the database before trying to access it
await initDatabase()

// Create new blog post
const post = new Post({
  title: 'Hello Mongoose!',
  author: 'Brian Teeters',
  contents: 'This post is stored in a MongoDB database using Mongoose.',
  tags: ['mongoose', 'mongodb'],
})

// Call .save() on the post to save it to the database
await post.save()

// Use .find() to list all posts, and log result
const posts = await Post.find()
console.log(posts)

// Run "node src/example.js" in the console to see it run
