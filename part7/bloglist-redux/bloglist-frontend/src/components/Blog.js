import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
import BlogComment  from './BlogComment'

const Blog = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.login)
  const { id } = useParams()
  const blog = useSelector(state => state.blogs.find(b => b.id === id))

  useEffect(() => {
    if (blog) {
      document.title = `${blog.title} | Blog App`
    }
  }, [blog])

  const handleLike = async () => {
    dispatch(likeBlog(blog))
    dispatch(showNotification(`you liked ${blog.title}`, 3))
  }

  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog))
      dispatch(showNotification(`you deleted ${blog.title}`, 3))
    }
  }

  if (!blog) {
    return null
  }

  return (
    <div>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes
        <button onClick={handleLike}>like</button>
        {blog.user?.username === user?.username && (
          <button onClick={handleDelete}>remove</button>
        )}
      </div>
      <div>
        added by {blog.user?.username}
      </div>
      <h3>comments</h3>
      <BlogComment blog={blog} />
    </div>
  )
}

export default Blog
