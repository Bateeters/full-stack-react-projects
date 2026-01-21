import { Post } from '../db/models/post.js'

// Define new createPost()
export async function createPost({ title, author, contents, tags }) {
  // We list all the properties we want the user to provide in order to have control over which properties the user can set
  const post = new Post({ title, author, contents, tags })
  return await post.save()
}
