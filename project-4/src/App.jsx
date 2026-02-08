import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Blog } from './Blog.jsx'
import { Home } from './Home.jsx'
import { Route, Routes } from 'react-router-dom'
import { EditPost } from './components/EditPost.jsx'

const queryClient = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/blog/:id' element={<div>Post Page</div>} />
        <Route path='/blog/:id/edit' element={<EditPost />} />
      </Routes>
    </QueryClientProvider>
  )
}
