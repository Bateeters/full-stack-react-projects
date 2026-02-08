import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { createPost } from '../api/posts.js'

export function CreatePost() {
  // define state hooks for title, author, and contents
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [contents, setContents] = useState('')
  const [tags, setTags] = useState('')

  const queryClient = useQueryClient()

  // Define a mutation hook, calling the createPost function
  const createPostMutation = useMutation({
    mutationFn: () => {
      const tagsArray = tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean)

      return createPost({ title, author, contents, tags: tagsArray })
    },
    // on successful mutations, invalidate all queries with the 'post' query key
    onSuccess: () => queryClient.invalidateQueries(['posts']),
  })

  // Define a handleSubmit function to prevent default (page refresh) and execute the mutation using .mutate()
  const handleSubmit = (e) => {
    e.preventDefault()
    createPostMutation.mutate()
    setTitle('')
    setAuthor('')
    setTags('')
    setContents('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='create-title'>Title: </label>
        <input
          type='text'
          name='create-title'
          id='create-title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor='create-author'>Author: </label>
        <input
          type='text'
          name='create-author'
          id='create-author'
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor='create-tags'>Tags (separate by commas): </label>
        <textarea
          type='text'
          name='create-tags'
          id='create-tags'
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>
      <textarea
        value={contents}
        onChange={(e) => setContents(e.target.value)}
      />
      <input
        type='submit'
        // make the button say 'Creating...' if mutation is in progress
        value={createPostMutation.isPending ? 'Creating...' : 'Create'}
        // disable the 'Create' button if title is not filled or if mutation is in progress
        disabled={!title || createPostMutation.isPending}
      />

      {
        // Message below create button if mutation is successfull
        createPostMutation.isSuccess ? <>Post Created Successfully!</> : null
      }
    </form>
  )
}
