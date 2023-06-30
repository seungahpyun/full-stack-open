import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useParams } from 'react-router-dom'

const Blog = () => {
  const dispatch = useDispatch()

  const id = useParams().id
  const blogs = useSelector(state => state.blogs)
  const blog = blogs.find(blog => blog.id === id)
  const currentUser = useSelector(state => state.user)


  useEffect(() => {
    if (blog) {
      dispatch(setNotification(`you liked '${blog.title}'`, 5))
    }
  }, [blog, dispatch])

  const handleLike = async () => {
    dispatch(likeBlog(blog))
  }


  if (!blog) {
    return null
  }

  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <p>{blog.url}</p>
      <p>
        {blog.likes} likes
        <button onClick={handleLike}>like</button>
      </p>
      <p>added by {blog.user.username}</p>
      {currentUser && currentUser.username === blog.user.username && (
        <button onClick={() => dispatch(deleteBlog(blog))}>remove</button>
      )}
    </div>
  )
}


export default Blog
