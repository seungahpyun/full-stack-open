import React, { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import { useQuery } from 'react-query'
import { useUser } from './UserContext'

const App = () => {
  const { user, dispatch } = useUser()
  const blogFormRef = useRef()

  const fetchBlogs = () => blogService.getAll()
  const { data: blogs, isSuccess } = useQuery('blogs', fetchBlogs)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch({ type: 'SET_USER', data: user })
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.clear()
    dispatch({ type: 'CLEAR_USER' })
  }

  return (
    <div>
      <h1>Blog</h1>
      <Notification />
      {!user ? (
        <LoginForm />
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
