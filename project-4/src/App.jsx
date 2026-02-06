import { PostList } from './components/PostList.jsx'
import { CreatePost } from './components/CreatePost.jsx'
import { PostFilter } from './components/PostFilter.jsx'
import { PostSorting } from './components/PostSorting.jsx'
import { Post } from './components/Post.jsx'

const posts = [
  {
    title: 'Full-Stack React Projects',
    contents: "Let's dive into full-stack development!",
    author: 'Brian Teeters',
  },
  {
    title: 'Hello React!',
  },
]

export function App() {
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
