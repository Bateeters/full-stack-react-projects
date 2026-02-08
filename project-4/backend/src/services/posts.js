import { Post } from '../db/models/post.js'

// Define createPost() for post creation
export async function createPost({ title, author, contents, tags }) {
  // Ensure tags is an array
  const normalizedTags = Array.isArray(tags)
    ? tags.map((tag) => tag.trim().toLowerCase()).filter(Boolean)
    : []

  // We list all the properties we want the user to provide in order to have control over which properties the user can set
  const post = new Post({
    title,
    author,
    contents,
    tags: normalizedTags,
  })

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
  // find if sortOrder is descending or ascending
  // mongo uses -1 for descending and 1 for ascending
  const mongoSortOrder = sortOrder === 'descending' ? -1 : 1

  // We then use .find() from our Mongoose model to list all posts, passing an argument to sort them
  return await Post.find(query).sort({
    [sortBy]: mongoSortOrder,
  })
}

// Now with listPost() defined, let's define listAllPost()
export async function listAllPosts(options) {
  // this passes an empty object as query making sure it returns all posts, sorted by "options"
  return await listPosts({}, options)
}

// defining listPostsByAuthor()
export async function listPostsByAuthor(author, options) {
  if (!author || !author.trim()) {
    return await listAllPosts(options)
  }

  return await listPosts(
    {
      author: {
        $regex: author.trim(),
        $options: 'i',
      },
    },
    options,
  )
}

// defining listPostsByTag()
export async function listPostsByTag(tag, options) {
  return await listPosts({ tags: tag.toLowerCase() }, options)
}

// defining getPostById()
export async function getPostById(postId) {
  return await Post.findById(postId)
}

// defining updatePost()
// the function takes an ID of an existing post, and an object of parameters to be updated
export async function updatePost(postId, { title, author, contents, tags }) {
  return await Post.findOneAndUpdate(
    // we find the post with the ID
    { _id: postId },

    // we specify which parameters to change with $set
    { $set: { title, author, contents, tags } },

    // we make sure the function returns the modified object instead of the original
    { new: true },
  )
}

// defining deletePost()
export async function deletePost(postId) {
  return await Post.deleteOne({ _id: postId })
}
