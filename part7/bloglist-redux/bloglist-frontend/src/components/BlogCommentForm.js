import React from 'react'
import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'

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
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type='text'
            id='comment'
          />
          <button id='create-comment-button' type="submit">add comment</button>
        </div>
      </form>
    </div>
  )
}

export default BlogCommentForm
