import mongoose from 'mongoose'
import { describe, expect, test } from '@jest/globals'
import { createPost } from '../services/posts.js'
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

// Now that we have all our tests, it's time to run 'npm test' in the console
