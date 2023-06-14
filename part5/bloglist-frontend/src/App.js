import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setErrorMessage(null)
    } catch (error) {
      console.error('Login error:', error)
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.error)
      } else {
        setErrorMessage('Error occurred during login')
      }
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setErrorMessage(null)
  }

  const handleCreateBlog = async (blog) => {
    try {
      const createdBlog = await blogService.create(blog)
      setBlogs(blogs.concat(createdBlog))
      setErrorMessage(`a new blog ${createdBlog.title} by ${createdBlog.author} added`)
    } catch (error) {
      console.error('Create blog error:', error)
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.error)
      } else {
        setErrorMessage('Error occurred during blog creation')
      }
    }
  }

  const loginForm = () => (
    <div>
      <Notification message={errorMessage} />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const blogForm = () => (
    <div>
      <Notification message={errorMessage} />
      <p>hello, {user.username} 👋</p>
      <button onClick={handleLogout}>logout</button>
      <BlogForm handleCreateBlog={handleCreateBlog}/>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )

  return (
    <div>
      <h1>Blog</h1>
      {!user ? loginForm() : blogForm()}
    </div>
  )
}

export default App
