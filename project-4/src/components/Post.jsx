import PropTypes from 'prop-types'

// Post component that accepts a title, contents, and author
export function Post({ title, contents, author }) {
  return (
    <article>
      <h3>{title}</h3>
      <div>{contents}</div>
      {author && (
        <em>
          Written by <strong>{author}</strong>
        </em>
      )}
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
