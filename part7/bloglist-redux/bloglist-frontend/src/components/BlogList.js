import { useSelector } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'
import BlogForm from './BlogForm'
import Blog from './Blog'
import Togglable from './Togglable'


const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  const blogFormRef = useSelector(state => state.blogFormRef)


  return (
    <div>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default BlogList
