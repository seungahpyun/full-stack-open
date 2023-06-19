import React, { useState } from 'react'

const Blog = ({ blog, handleLikeBlog, handleDeleteBlog, currentUser }) => {
  const [expanded, setExpanded] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const isCurrentUserCreator = blog.user && blog.user.username ? blog.user.username === currentUser : false


  return (
    <div style={blogStyle}>
      <div id='title-author'>
        <span data-testid='blog-title'>{blog.title} - </span>
        <span data-testid='blog-author'>{blog.author}</span>
      </div>
      <button onClick={() => setExpanded(!expanded)}>
        {expanded ? 'hide' : 'view'}
      </button>
      {expanded && (
        <div className='blog-details'>
          <div data-testid='blog-url'>{blog.url}</div>
          <div data-testid='blog-likes'>
            likes {blog.likes}
            <button id='like-button' onClick={() => handleLikeBlog(blog)}>like</button>
          </div>
          <div data-testid='blog-author'>{blog.author}</div>
          {isCurrentUserCreator && ( // Render the delete button only if the current user is the creator
            <button id='delete-button' onClick={() => handleDeleteBlog(blog)}>delete</button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
