import React from 'react'
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'
import BlogCommentForm from './BlogCommentForm'
import { ListGroup } from 'react-bootstrap'

const selectComments = createSelector(
  state => state.blogs,
  (_, blog) => blog,
  (blogs, blog) => blogs.find(b => b.id === blog.id)?.comments || []
)

const BlogComment = ({ blog }) => {
  const comments = useSelector(state => selectComments(state, blog))

  return (
    <div>
      <BlogCommentForm blog={blog} />
      <ListGroup variant="flush">
        {comments.map(comment =>
          <ListGroup.Item key={comment._id}>{comment.content}</ListGroup.Item>
        )}
      </ListGroup>
    </div>
  )
}

export default BlogComment
