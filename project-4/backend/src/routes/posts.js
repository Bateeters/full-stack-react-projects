// Import all our service functions
import {
  listAllPosts,
  listPostsByAuthor,
  listPostsByTag,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from '../services/posts.js'

// Create and export a new function that takes the Express app as an argument
export function postsRoutes(app) {
  /* ==============

  Define the routes.
  Start with the GET/api/v1/posts route

  =============== */
  app.get('/api/v1/posts', async (req, res) => {
    // Use query params, req.query, to map them to the arguments of our functions.
    // This is to be able to add sortBy, sortOrder, author, and tag to our queries
    const { sortBy, sortOrder, author, tag } = req.query
    const options = { sortBy, sortOrder }

    // Create a try/catch incase invalid data is entered, this handles potential errors
    try {
      // Check if author OR tag was provided, throw 400 error if both
      if (author && tag) {
        return res
          .status(400)
          .json({ error: 'query by either author or tag, not both' })
      }
      // Otherwise, call respective service function and return JSON respose with res.json()
      else if (author) {
        return res.json(await listPostsByAuthor(author, options))
      } else if (tag) {
        return res.json(await listPostsByTag(tag, options))
      } else {
        return res.json(await listAllPosts(options))
      }

      // If an error happens, we catch it, log it, and return a 500 status
    } catch (err) {
      console.error('error listing posts', err)
      return res.status(500).end()
    }
  })

  // Define API route to get a single post using the :id param placeholder, making it a dynamic parameter in the funciton
  app.get('/api/v1/posts/:id', async (req, res) => {
    // access req.params.id to get the :id part of the route and pass it to the service function
    const { id } = req.params
    try {
      const post = await getPostById(id)

      // If the id does not exist, return null and a 404 status since post was not found
      if (post === null) return res.status(404).end()

      // Otherwise, return post as JSON response
      return res.json(post)
    } catch (err) {
      console.error('error getting post', err)
      return res.status(500).end()
    }
  })

  // Define API route to POST a new post
  app.post('/api/v1/posts', async (req, res) => {
    try {
      // Create a new post and return the JSON object
      const post = await createPost(req.body)
      return res.json(post)

      // Catch any errors and return a 500 status
    } catch (err) {
      console.error('error creating post', err)
      return res.status(500).end()
    }
  })

  // Define API route to update (PATCH) post using the id param and req.body
  app.patch('/api/v1/posts/:id', async (req, res) => {
    try {
      const post = await updatePost(req.params.id, req.body)
      return res.json(post)
    } catch (err) {
      console.error('error updating post', err)
      return res.status(500).end()
    }
  })

  // Define API route to DELETE post using the id param
  app.delete('/api/v1/posts/:id', async (req, res) => {
    try {
      const { deletedCount } = await deletePost(req.params.id)

      // We return 404 if no post was found
      if (deletedCount === 0) return res.sendStatus(404)

      // and 204 No Content, if the post was successfully deleted
      return res.status(204).end()
    } catch (err) {
      console.error('error deleting post', err)
      return res.status(500).end()
    }
  })
}

// You still need to mount them in our app so we need to go to app.js and import postsRoutes
