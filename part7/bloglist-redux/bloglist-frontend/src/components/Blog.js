import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
import BlogComment from './BlogComment'
import { Container, StyledBlog, Button } from './StyledComponents'

const Blog = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

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
    dispatch(showNotification(`you liked ${blog.title}`,'success', 3))
  }

  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog))
      dispatch(showNotification(`you deleted ${blog.title}`, 3))
      navigate('/')
    }
  }

  if (!blog) {
    return null
  }

  return (
    <div>
      <Container>
        <StyledBlog>
          <div>
            Title : {blog.title}
          </div>
          <div>
            Author : {blog.author}
          </div>
          <div id='blog-url'>
            url : <a href={blog.url}>{blog.url}</a>
          </div>
          <div>
            Total likes : {blog.likes} likes
            <Button onClick={handleLike} style = {{ fontSize:'0.8rem' }}>like</Button>
          </div>
          <hr />
          <div id='added-by'>
            Blog added by {blog.user?.username}
            {blog.user?.username === user?.username && (
              <Button onClick={handleDelete}>delete</Button>
            )}
          </div>
        </StyledBlog>
        <BlogComment blog={blog} />
      </Container>
    </div>
  )
}

export default Blog
