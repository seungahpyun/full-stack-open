import React from 'react'
import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
import { StyledButton, StyledBlogCommentForm } from './StyledComponents'

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
      <StyledBlogCommentForm onSubmit={handleSubmit}>
        <input
          type='text'
          id='comment'
          placeholder='comment...'
        />
        <StyledButton id='create-comment-button' type="submit">add</StyledButton>
      </StyledBlogCommentForm>
    </div>
  )
}

export default BlogCommentForm
