import React from 'react'
import blogService from '../services/blogs'
import { addBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { showNotification }  from '../reducers/notificationReducer'
import { Form, Button } from 'react-bootstrap'
import styled from 'styled-components'

const StyledForm = styled(Form)`
  width: 50%;
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-left: auto;
  margin-right: auto;
  padding: 1rem;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  background-color: #f7f9fa;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);`

const BlogForm = () => {
  const dispatch = useDispatch()

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
  }

  return (
    <div>
      <StyledForm onSubmit={handleSubmit}>
        <h2>Create new</h2>
        <div>
            title:
          <input
            type='text'
            id='title'
          />
        </div>
        <div>
            author:
          <input
            type='text'
            id='author'
          />
        </div>
        <div>
            url:
          <input
            type='text'
            id='url'
          />
        </div>
        <Button id='create-blog-button' type="submit">create</Button>
      </StyledForm>
    </div>
  )
}

export default BlogForm
