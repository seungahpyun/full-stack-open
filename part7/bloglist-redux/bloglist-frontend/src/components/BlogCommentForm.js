import React from 'react'
import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
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

const StyledButton = styled(Button)`
  margin-left: 0.5rem;`



const BlogCommentForm = ({ blog }) => {
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()

    const comment = event.target.comment.value

    event.target.comment.value = ''
    dispatch(addComment(blog, comment))
    dispatch(showNotification(`you commented ${comment}`, 3))
  }

  return (
    <div>
      <h2>Comments</h2>
      <StyledForm onSubmit={handleSubmit}>
        <div>
          <input
            type='text'
            id='comment'
          />
          <StyledButton id='create-comment-button' type="submit">add comment</StyledButton>
        </div>
      </StyledForm>
    </div>
  )
}

export default BlogCommentForm
