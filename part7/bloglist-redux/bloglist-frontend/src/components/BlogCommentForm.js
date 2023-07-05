import React from 'react'
import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
import { Form, Button } from 'react-bootstrap'


const BlogCommentForm = ({ blog }) => {
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()

    const comment = event.target.comment.value

    event.target.comment.value = ''
    dispatch(addComment(blog, comment))
    dispatch(showNotification(`you commented ${comment}`, 5))
  }

  return (
    <div>
      <h2>Comments</h2>
      <Form onSubmit={handleSubmit}>
        <div>
          <input
            type='text'
            id='comment'
          />
          <Button id='create-comment-button' type="submit">add comment</Button>
        </div>
      </Form>
    </div>
  )
}

export default BlogCommentForm
