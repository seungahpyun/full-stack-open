import React from 'react'
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'
import { StyledBlogComment } from './StyledComponents'
import BlogCommentForm from './BlogCommentForm'


const selectComments = createSelector(
  state => state.blogs,
  (_, blog) => blog,
  (blogs, blog) => (blogs.find(b => b.id === blog.id)?.comments || [])
)

const BlogComment = ({ blog }) => {
  const comments = useSelector(state => selectComments(state, blog))

  return (
    <StyledBlogComment>
      <h3>Added Comments</h3>
      <hr />
      <BlogCommentForm blog={blog} />
      {comments.length === 0 ? (
        <div>There is no comments yet.</div>
      ) : (
        comments.map(comment => (
          <div key={comment._id}>{comment.content}</div>
        ))
      )}
    </StyledBlogComment>
  )
}

export default BlogComment
