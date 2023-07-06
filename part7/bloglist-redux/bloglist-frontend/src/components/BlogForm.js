import React from 'react'
import blogService from '../services/blogs'
import { addBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { showNotification }  from '../reducers/notificationReducer'
import { StyledBlogFormContainer, StyledBlogForm, StyledButton } from './StyledComponents'
import { useNavigate } from 'react-router-dom'

const BlogForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleSubmit = async (event) => {
    event.preventDefault()

    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value

    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
    const newBlog = await blogService.create({ title, author, url })
    dispatch(addBlog(newBlog))
    dispatch(showNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`, 5))
    navigate('/')
  }

  return (
    <StyledBlogFormContainer>
      <StyledBlogForm onSubmit={handleSubmit}>
        <h2>Create new</h2>
        <div>
          <input
            type='text'
            id='title'
            placeholder='title'
          />
        </div>
        <div>
          <input
            type='text'
            id='author'
            placeholder='author'
          />
        </div>
        <div>
          <input
            type='text'
            id='url'
            placeholder='url'
          />
        </div>
        <StyledButton id='create-blog-button' type="submit">create</StyledButton>
      </StyledBlogForm>
    </StyledBlogFormContainer>
  )
}

export default BlogForm
