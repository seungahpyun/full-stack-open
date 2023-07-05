import React from 'react'
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'
import BlogCommentForm from './BlogCommentForm'
import { ListGroup } from 'react-bootstrap'
import styled from 'styled-components'

const StyledListGroup = styled(ListGroup)`
  width: 60%;
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-left: auto;
  margin-right: auto;
  padding: 1rem;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  background-color: #f7f9fa;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);`


const selectComments = createSelector(
  state => state.blogs,
  (_, blog) => blog,
  (blogs, blog) => (blogs.find(b => b.id === blog.id)?.comments || [])
)

const BlogComment = ({ blog }) => {
  const comments = useSelector(state => selectComments(state, blog))

  return (
    <div>
      <BlogCommentForm blog={blog} />
      <StyledListGroup variant="flush">
        {comments.map(comment =>
          <ListGroup.Item key={comment._id}>{comment.content}</ListGroup.Item>
        )}
      </StyledListGroup>
    </div>
  )
}

export default BlogComment
