import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getPostById } from '../api/posts.js'

export function EditPost() {
  const { id } = useParams() // Extract 'id' from the URL params

  const postQuery = useQuery({
    // queryKey is extremely important for TanStack Query, it's used to uniquely identify a request
    queryKey: ['post', id],
    queryFn: () => getPostById(id),
  })

  const post = postQuery.data // Get post data from query

  return (
    <div>
      <label>Title: </label>
      <input value={post?.title} />
      <p>Author: {post?.author}</p>
      <label>Content:</label>
      <textarea value={post?.contents}></textarea>
      <label>Tags:</label>
      <input value={post?.tags}></input>
      <p>Post ID: {id}</p> {/* Display the id */}
      <p></p>
    </div>
  )
}
