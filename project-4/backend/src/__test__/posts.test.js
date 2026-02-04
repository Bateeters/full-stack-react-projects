import mongoose from 'mongoose'
import { describe, expect, test, beforeEach } from '@jest/globals'
import {
  createPost,
  listAllPosts,
  listPostsByAuthor,
  listPostsByTag,
  getPostById,
  updatePost,
  deletePost,
} from '../services/posts.js'
import { Post } from '../db/models/post.js'

// Let's use describe() to define a new test
// this function describes a group of tests
describe('creating posts', () => {
  // let's define a test by using test()
  // we can pass an async function here in order to use async/await
  // we'll call the first test 'creating posts with all parameters should succeed'
  test('with all parameters should succeed', async () => {
    // Now we'll use createPost() to create a new post with some parameters
    const post = {
      title: 'Hello Mongoose! Long time no see!',
      author: 'Brian Teeters',
      contents: 'This post is stored in a MongoDB database using Mongoose.',
      tags: ['mongoose', 'mongodb'],
    }

    const createdPost = await createPost(post)

    // Now we need to verify that it returns a post with an ID by using expect()
    // We'll use toBeInstanceOf matcher to verify that it is an ObjectId
    expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId)

    // Now use Mongoose directly to find the post with the given ID
    const foundPost = await Post.findById(createdPost._id)

    // We use expect() to check if foundPost equals an object containing the properties of post
    expect(foundPost).toEqual(expect.objectContaining(post))

    // We also use expect() to check that the post has both createdAt and updatedAt timestamps
    expect(foundPost.createdAt).toBeInstanceOf(Date)
    expect(foundPost.updatedAt).toBeInstanceOf(Date)
  })

  // Let's now define a second test called 'creating posts without title should fail'
  test('without title should fail', async () => {
    const post = {
      author: 'Kyleigh Teeters',
      contents: 'Post with no title',
      tags: ['empty'],
    }

    // We'll use a try/catch to catch the error
    // we expect() it to be a Mongoose ValidationError, telling us the title is required
    try {
      await createPost(post)
    } catch (err) {
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
      expect(err.message).toContain('`title` is required')
    }
  })

  // Here's a 'with minimal parameters should succeed' test to check success on only having a title
  test('with minimal parameters should succeed', async () => {
    const post = {
      title: 'Only a title',
    }

    const createdPost = await createPost(post)
    expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId)
  })
})

// This will be our posts used in the tests
const samplePosts = [
  { title: 'Learning Redux', author: 'Daniel Bugl', tags: ['redux'] },
  { title: 'Learn React Hooks', author: 'Brian Teeters', tags: ['react'] },
  {
    title: 'Full-Stack React Projects',
    author: 'Brian Teeters',
    tags: ['react', 'nodejs'],
  },
  { title: 'Guide to TypeScript' },
]

// This will be where we populate our posts
let createdSamplePosts = []

// This function clears all posts including the database and the array of sample posts
// It then creates the sample posts in the database again for each post defined.
// This reset / repopulation ensures that we always have a consistent state of the database before each test
// It also makes sure we have an array to compare against when testing the list funcitons.
beforeEach(async () => {
  // Delete all posts in Post
  await Post.deleteMany({})
  // Makes sure createdSamplePosts is empty
  createdSamplePosts = []
  // For each post in samplePosts (the defined tests posts)...
  for (const post of samplePosts) {
    // ... create a new post object...
    const createdPost = new Post(post)
    // ... and push it to the empty createdSamplePosts array.
    createdSamplePosts.push(await createdPost.save())
  }
})

// Create a new testing group for listing the posts
describe('listing posts', () => {
  // Test that all posts return
  test('should return all posts', async () => {
    // Run the listAllPosts function
    const posts = await listAllPosts()

    // Compare the length of each array
    expect(posts.length).toEqual(createdSamplePosts.length)
  })

  // Test that posts are sorted by descending createdAt values
  test('should return posts sorted by creation date descending by default', async () => {
    // Run the listAllPosts function as it has default parameters set to sort
    const posts = await listAllPosts()

    // Manually sort the createdSamplePosts array
    const sortedSamplePosts = createdSamplePosts.sort(
      (a, b) => b.createdAt - a.createdAt,
    )

    // Compare the manually sorted dates to those returned by listAllPosts()
    expect(posts.map((post) => post.createdAt)).toEqual(
      sortedSamplePosts.map((post) => post.createdAt),
    )
  })

  // Test that listAllPosts can take arguments on sortBy and sortOrder
  test('should take into account provided sorting options', async () => {
    // Pass parameters for sortBy and sortOrder to make sure it's not using defaults
    const posts = await listAllPosts({
      sortBy: 'updatedAt',
      sortOrder: 'ascending',
    })

    // Manually sort createdSamplePosts array by updatedAt
    const sortedSamplePosts = createdSamplePosts.sort(
      // change order to ascending instead of descending
      (a, b) => a.updatedAt - b.updatedAt,
    )
    // Compare the manually sorted to what's returned by listAllPosts()
    expect(posts.map((post) => post.updatedAt)).toEqual(
      sortedSamplePosts.map((post) => post.updatedAt),
    )
  })

  // Test that listPostsByTag filters and returns only posts with a specified tag
  test('should be able to filter posts by tag', async () => {
    // Pass the 'nodejs' tag for filtering
    const posts = await listPostsByTag('nodejs')

    // Check that there is only 1 post returned
    expect(posts.length).toBe(1)
  })

  test('should be able to filter posts by author', async () => {
    const posts = await listPostsByAuthor('Brian Teeters')
    expect(posts.length).toBe(2)
  })
})

describe('getting a post', () => {
  // Test that getPostById returns only the post with the specified ID
  test('should return the full post', async () => {
    const post = await getPostById(createdSamplePosts[0]._id)
    // we use toObject() to convert the Mongoose object to a plain old JS object (POJO), letting us compare it to the sample
    expect(post.toObject()).toEqual(createdSamplePosts[0].toObject())
  })

  // Test that getPostById returns null if ID does not exist
  test('should fail if the id does not exist', async () => {
    const post = await getPostById('000000000000000000000000')
    expect(post).toEqual(null)
  })
})

describe('updating posts', () => {
  // Test that updatePost updates the object
  test('should update the specified property', async () => {
    // update the author for the first post
    await updatePost(createdSamplePosts[0]._id, {
      author: 'Test Author',
    })

    // check the author of the first post was updated
    const updatedPost = await Post.findById(createdSamplePosts[0]._id)
    expect(updatedPost.author).toEqual('Test Author')
  })

  // Test that updatePost updates only the specified properties
  test('should not update other properties', async () => {
    await updatePost(createdSamplePosts[0]._id, {
      author: 'Test Author',
    })

    // check the title was not updated
    const updatedPost = await Post.findById(createdSamplePosts[0]._id)
    expect(updatedPost.title).toEqual('Learning Redux')
  })

  // Test that updatedAt timestamp is getting updated
  test('should update the updatedAt timestamp', async () => {
    await updatePost(createdSamplePosts[0]._id, {
      author: 'Test Author',
    })

    const updatedPost = await Post.findById(createdSamplePosts[0]._id)
    // to compare the dates, we first need to convert them to numbers using .getTime()
    // we are then able to compare them using .toBeGreaterThan()
    expect(updatedPost.updatedAt.getTime()).toBeGreaterThan(
      createdSamplePosts[0].updatedAt.getTime(),
    )
  })

  // Test that updatePost fails if post does not exist
  test('should fail if the id does not exist', async () => {
    const post = await updatePost('000000000000000000000000', {
      author: 'Test Author',
    })

    expect(post).toEqual(null)
  })
})

describe('deleting posts', () => {
  // Test that deletePost removes the specified post
  test('should remove the post from the database', async () => {
    // delete the first post
    const result = await deletePost(createdSamplePosts[0]._id)
    // check to make sure 1 post was deleted
    expect(result.deletedCount).toEqual(1)

    // search for deleted post
    const deletedPost = await Post.findById(createdSamplePosts[0]._id)
    // check to make sure no post matches searched ID
    expect(deletedPost).toEqual(null)
  })

  // Testing that no post is deleted if the post doesn't exist
  test('should fail if the id does not exist', async () => {
    const result = await deletePost('000000000000000000000000')
    expect(result.deletedCount).toEqual(0)
  })
})
// Now that we have all our tests, it's time to run 'npm test' in the console
