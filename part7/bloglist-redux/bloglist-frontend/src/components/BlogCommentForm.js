import React from 'react'
import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
import { Button, CommentForm } from './StyledComponents'

const BlogCommentForm = ({ blog }) => {
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()

    const comment = event.target.comment.value

    event.target.comment.value = ''
    dispatch(addComment(blog, comment))
    dispatch(showNotification(`you commented ${comment}`,'success', 3))
  }

  return (
    <div>
      <CommentForm onSubmit={handleSubmit}>
        <input
          type='text'
          id='comment'
          placeholder='comment...'
        />
        <Button id='create-comment-button' type="submit">add</Button>
      </CommentForm>
    </div>
  )
}

export default BlogCommentForm
