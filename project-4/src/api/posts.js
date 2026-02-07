export const getPosts = async (queryParams) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/posts?` +
      new URLSearchParams(queryParams),
  )
  return await res.json()
}

// Func that accepts a post as an argument
export const createPost = async (post) => {
  // Make a request to the /posts endpoint
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts`, {
    // Let the backend know we are sending a JSON body and to then send our post object as a JSON string
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  })
  // We also need to parse the response as JSON
  return await res.json()
}
