import mongoose, { Schema } from 'mongoose'

// Define a new schema for posts
const postSchema = new Schema({
  // Specify all properties of a blog post and the corresponding types.
  // We have a required title, an author, and contents which are all strings.
  title: { type: String, required: true },
  author: String,
  contents: String,
  // We also have tags, which are a string array
  tags: [String],
})

// With our schema now defined, we can create a Mongoose model
// The first argument to .model() is the name of the collection - in this case it will be posts because we specified post (it always turns plurl)
export const Post = mongoose.model('post', postSchema)
