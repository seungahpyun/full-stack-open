import React, { useState, useEffect } from 'react'

const Blog = ({ blog, handleLikeBlog, handleDeleteBlog, currentUser }) => {
  const [expanded, setExpanded] = useState(false)
  const [isCreator, setIsCreator] = useState(false)

  useEffect(() => {
    setIsCreator(blog.user && blog.user.id === currentUser.id)
  }, [blog.user, currentUser.id])

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle} className='blog-details'>
      <div id='title-author'>
        <span data-testid='blog-title'>{blog.title} - </span>
        <span data-testid='blog-author'>{blog.author}</span>
      </div>
      <button id='view-button' onClick={toggleExpanded}>
        {expanded ? 'hide' : 'view'}
      </button>
      {expanded && (
        <div>
          <div data-testid='blog-url'>{blog.url}</div>
          <div data-testid='blog-likes'>
            likes {blog.likes}
            <button id='like-button' onClick={() => handleLikeBlog(blog)}>
              like
            </button>
          </div>
          <div data-testid='blog-author'>{blog.author}</div>
        </div>
      )}
      {isCreator && expanded && ( // Render the delete button only if the current user is the creator and the blog is expanded
        <button id='delete-button' onClick={() => handleDeleteBlog(blog)}>
          delete
        </button>
      )}
    </div>
  )
}

export default Blog
