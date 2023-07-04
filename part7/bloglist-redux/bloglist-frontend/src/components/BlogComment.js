import React from 'react'
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'
import BlogCommentForm from './BlogCommentForm'

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
      <ul>
        {comments.map(comment =>
          <li key={comment._id}>{comment.content}</li>
        )}
      </ul>
    </div>
  )
}

export default BlogComment
