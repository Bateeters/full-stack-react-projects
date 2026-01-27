import { Post } from '../db/models/post.js'

// Define createPost() for post creation
export async function createPost({ title, author, contents, tags }) {
  // We list all the properties we want the user to provide in order to have control over which properties the user can set
  const post = new Post({ title, author, contents, tags })
  return await post.save()
}

// Define listPosts() for sorting and listing of posts
async function listPosts(
  // this function accepts a query and options argument
  // leaving query empty defaults to showing ALL posts
  query = {},
  // we then define the default to be sorted by createdAt timestamp and to list them in a descending order
  { sortBy = 'createdAt', sortOrder = 'descending' } = {},
) {
  // We then use .find() from our Mongoose model to list all posts, passing an argument to sort them
  return await Post.find(query).sort({ [sortBy]: sortOrder })
}

// Now with listPost() defined, let's define listAllPost()
export async function listAllPosts(options) {
  // this passes an empty object as query making sure it returns all posts, sorted by "options"
  return await listPosts({}, options)
}

// defining listPostsByAuthor()
export async function listPostsByAuthor(author, options) {
  return await listPosts({ author }, options)
}

// defining listPostsByTag()
export async function listPostsByTag(tags, options) {
  return await listPosts({ tags }, options)
}
