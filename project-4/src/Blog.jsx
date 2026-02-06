import { useQuery } from '@tanstack/react-query'
import { PostList } from './components/PostList.jsx'
import { CreatePost } from './components/CreatePost.jsx'
import { PostFilter } from './components/PostFilter.jsx'
import { PostSorting } from './components/PostSorting.jsx'
import { getPosts } from './api/posts.js'

export function Blog() {
  const postsQuery = useQuery({
    // queryKey is extremely important for TanStack Query, it's used to uniquely identify a request
    queryKey: ['posts'],
    queryFn: () => getPosts(),
  })

  // get the posts from the query. fall back to an empty array if no posts are loaded yet
  const posts = postsQuery.data ?? []

  return (
    <div style={{ padding: 15 }}>
      <CreatePost />
      <hr />
      Filter by:
      <PostFilter field='author' />
      <PostSorting fields={['createdAt', 'updatedAt']} />
      <hr />
      <PostList posts={posts} />
    </div>
  )
}
