import React, { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import { useNotification } from '../NotificationContext'
import { useQueryClient } from 'react-query'


const Blog = ({ blog, currentUser }) => {
  const [expanded, setExpanded] = useState(false)
  const [isCreator, setIsCreator] = useState(false)

  const { setNotification } = useNotification()
  const queryClient = useQueryClient()

  useEffect(() => {
    setIsCreator(blog.user && blog.user.username === currentUser)
  }, [blog.user, currentUser])

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  const handleLikeBlog = async (blog) => {
    const currentLikes = blog.likes || 0
    const updatedBlog = { ...blog, likes: currentLikes + 1 }

    try {
      await blogService.update(blog.id, updatedBlog)
      setNotification(`Blog ${updatedBlog.title} was liked!`)
      queryClient.invalidateQueries('blogs')
    } catch (error) {
      setNotification('An error occurred while updating the blog', 'error')
    }
  }

  const handleDeleteBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove(blog.id)
      queryClient.invalidateQueries('blogs')
    }
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
      {isCreator && expanded && (
        <button id='delete-button' onClick={() => handleDeleteBlog(blog)}>
          delete
        </button>
      )}
    </div>
  )
}

export default Blog
