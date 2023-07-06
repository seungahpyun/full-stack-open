import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
import BlogComment  from './BlogComment'
import { StyledContainer, StyledBlog, StyledButtonGroup, StyledButton } from './StyledComponents'

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
      <StyledContainer>
        <StyledBlog>
          <div>
            Blog Title : {blog.title}
          </div>
          <div>
            Blog Author : {blog.author}
          </div>
          <div>
            Blog url : <a href={blog.url}>{blog.url}</a>
          </div>
          <div>
            Total likes : {blog.likes} likes
          </div>
        </StyledBlog>
        <div>
            Blog added by {blog.user?.username}
        </div>
        <StyledButtonGroup>
          <StyledButton onClick={handleLike}>like</StyledButton>
          {blog.user?.username === user?.username && (
            <StyledButton onClick={handleDelete}>remove</StyledButton>
          )}
        </StyledButtonGroup>
        <BlogComment blog={blog} />
      </StyledContainer>
    </div>
  )
}

export default Blog
