import React from 'react'
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'
import BlogCommentForm from './BlogCommentForm'
import { StyledListGroup } from './StyledComponents'


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
      <StyledListGroup>
        {comments.length === 0 ? (
          <div>There is no comments yet.</div>
        ) : (
          comments.map(comment => (
            <div key={comment._id}>{comment.content}</div>
          ))
        )}
      </StyledListGroup>
    </div>
  )
}

export default BlogComment
