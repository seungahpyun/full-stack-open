import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.login)

  useEffect(() => {
    if (blog) {
      document.title = `${blog.title} | Blog App`
    }
  }, [blog])

  const handleLike = async () => {
    dispatch(likeBlog(blog))
    dispatch(setNotification(`you liked ${blog.title}`, 5))
  }

  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog))
      dispatch(setNotification(`you deleted ${blog.title}`, 5))
    }
  }

  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes
        <button onClick={handleLike}>like</button>
        {blog.user && blog.user.username === user.username && (
          <button onClick={handleDelete}>remove</button>
        )}
      </div>
      <div>
        added by {blog.user && blog.user.username}
      </div>
    </div>
  )
}

export default Blog
