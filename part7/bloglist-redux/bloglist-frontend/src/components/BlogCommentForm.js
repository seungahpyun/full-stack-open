import React from 'react'
import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
import { StyledButton, StyledForm } from './StyledComponents'

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
