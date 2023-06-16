import React, { useState, useEffect,useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const blogFormRef = useRef()

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

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setErrorMessage(null)
  }

  const handleLikeBlog = async (blog) => {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    const updatedBlog = await blogService.update(blog.id, newBlog)
    setBlogs(blogs.map((blog) => (blog.id !== updatedBlog.id ? blog : updatedBlog)))
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
      {!user ? (
        <LoginForm setUser={setUser} setErrorMessage={setErrorMessage} errorMessage={errorMessage} />
      ) : (
        <div>
          <p>hello, {user && user.username} 👋</p>
          <button onClick={handleLogout}>logout</button>
          <Togglable buttonLabel="Create New Blog" ref={blogFormRef}>
            <BlogForm blogs={blogs} setBlogs={setBlogs} setErrorMessage={setErrorMessage} blogFormRef={blogFormRef} />
          </Togglable>
          <h2>blogs</h2>
          {blogs.sort((a, b) => b.likes - a.likes).map((blog) => (
              <Blog key={blog.id} blog={blog} handleLikeBlog={handleLikeBlog} handleDeleteBlog={handleDeleteBlog}/>
          ))}
        </div>
      )}
    </div>
  )
}

export default App
