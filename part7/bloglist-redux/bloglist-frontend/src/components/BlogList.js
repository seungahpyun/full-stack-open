import { useSelector } from 'react-redux'
import BlogForm from './BlogForm'
import Blog from './Blog'
import Togglable from './Togglable'


const BlogList = () => {
  const blogs = useSelector(state => state.blogs)

  return (
    <div>
      <Togglable buttonLabel='create new blog'>
        <BlogForm />
      </Togglable>
      {[...blogs].sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default BlogList
