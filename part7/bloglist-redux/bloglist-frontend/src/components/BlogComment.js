import React from 'react'
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'
import { StyledBlogComment } from './StyledComponents'


const selectComments = createSelector(
  state => state.blogs,
  (_, blog) => blog,
  (blogs, blog) => (blogs.find(b => b.id === blog.id)?.comments || [])
)

const BlogComment = ({ blog }) => {
  const comments = useSelector(state => selectComments(state, blog))

  return (
    <div>
      <StyledBlogComment>
        <h3>Added Comments</h3>
        {comments.length === 0 ? (
          <div>There is no comments yet.</div>
        ) : (
          comments.map(comment => (
            <div key={comment._id}>{comment.content}</div>
          ))
        )}
      </StyledBlogComment>
    </div>
  )
}

export default BlogComment
