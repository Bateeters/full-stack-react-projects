import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

// Post component that accepts a title, contents, and author
export function Post({ title, contents, author, updatedAt, tags, _id }) {
  const isoDateString = updatedAt
  const dateObject = new Date(isoDateString)

  const formattedUpdate = dateObject.toLocaleDateString('en-US')

  const navigate = useNavigate()

  return (
    <article>
      <span>{_id}</span>
      <h3>{title}</h3>
      <div>{contents}</div>
      <div style={{ display: 'flex' }}>
        {tags.map((tag) => (
          <h5
            style={{
              padding: '6px 12px',
              border: '1px solid #dddddd',
              marginRight: '15px',
              borderRadius: '7px',
              backgroundColor: 'whitesmoke',
            }}
            key={tag}
          >
            {tag}
          </h5>
        ))}
      </div>
      {author && (
        <em>
          Written by <strong>{author}</strong> - Last Updated: {formattedUpdate}
        </em>
      )}
      <button onClick={() => navigate(`/blog/${_id}`)}>View More</button>
      <button onClick={() => navigate(`/blog/${_id}/edit`)}>Edit</button>
    </article>
  )
}

// Defining propTypes making sure title is required
// propTypes are used to validate the props passed to React components when using JS
Post.propTypes = {
  title: PropTypes.string.isRequired,
  contents: PropTypes.string,
  author: PropTypes.string,
}
