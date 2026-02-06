import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Post } from './Post.jsx'

// Define the PostList component to accept a posts array, set it to empty if it's not defined
export function PostList({ posts = [] }) {
  // Use .map() to iterate through the array and populate a Post component for each
  // Pass all the keys from the post object by using {...post}, this is the same as writing out each key=value pair (title = ..., author = ..., etc)
  // We then assign each Post component an id using key and the unique post id in the uppermost element
  return (
    <div>
      {posts.map((post) => (
        <Fragment key={post._id}>
          <Post {...post} />
          <hr />
        </Fragment>
      ))}
    </div>
  )
}

// Define the prop types
PostList.propTypes = {
  // post is an array of Post objects
  post: PropTypes.arrayOf(PropTypes.shape(Post.propTypes)).isRequired,
}
