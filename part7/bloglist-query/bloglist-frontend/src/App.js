import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import  { useNotification } from './NotificationContext'
import Notification from './components/Notification'
import { useQuery, useQueryClient } from 'react-query'

const App = () => {
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()
  const queryClient = useQueryClient()

  const { setNotification } = useNotification()

  const fetchBlogs = () => blogService.getAll()
  const { data: blogs, isSuccess } = useQuery('blogs', fetchBlogs)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
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

  return (
    <div>
      <h1>Blog</h1>
      <Notification />
      {!user ? (
        <LoginForm setUser={setUser} />
      ) : (
        <div>
          <p>hello, {user && user.username} 👋</p>
          <button onClick={handleLogout}>logout</button>
          <Togglable buttonLabel='Create New Blog' ref={blogFormRef}>
            <BlogForm blogFormRef={blogFormRef} />
          </Togglable>
          {isSuccess && (
            <div>
              <h2>blogs</h2>
              {[...blogs].sort((a, b) => (b.likes || 0) - (a.likes || 0)).map((blog) => (
                <Blog
                  key={blog.id}
                  blog={blog}
                  handleLikeBlog={handleLikeBlog}
                  handleDeleteBlog={handleDeleteBlog}
                  currentUser={user ? user.username : null}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default App
