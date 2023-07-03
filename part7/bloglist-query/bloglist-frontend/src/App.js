import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import  { useNotification } from './NotificationContext'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const blogFormRef = useRef()

  const { setNotification } = useNotification()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

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
    setErrorMessage(null)
  }

  const handleLikeBlog = async (blog) => {
    if (!blog.id) {
      console.log('Error: Blog ID is missing')
      return
    }
    const currentLikes = blog.likes || 0
    const updatedBlog = { ...blog, likes: currentLikes + 1 }

    try {
      const response = await blogService.update(blog.id, updatedBlog)
      console.log('Update response:', response)
      const updatedBlogId = response.id

      setBlogs((blogs) =>
        blogs.map((b) => (b.id !== updatedBlogId ? b : response))
      )
      setNotification(`Blog ${updatedBlog.title} was liked!`)  // Add this line
    } catch (error) {
      console.log('An error occurred while updating the blog:', error)
      setNotification('An error occurred while updating the blog', 'error')  // And this line
    }
  }

  const handleDeleteBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter((b) => b.id !== blog.id))
    }
  }

  return (
    <div>
      <h1>Blog</h1>
      <Notification />
      {!user ? (
        <LoginForm setUser={setUser} setErrorMessage={setErrorMessage} errorMessage={errorMessage} />
      ) : (
        <div>
          <p>hello, {user && user.username} 👋</p>
          <button onClick={handleLogout}>logout</button>
          <Togglable buttonLabel='Create New Blog' ref={blogFormRef}>
            <BlogForm blogs={blogs} setBlogs={setBlogs} setErrorMessage={setErrorMessage} blogFormRef={blogFormRef} />
          </Togglable>
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
  )
}

export default App
