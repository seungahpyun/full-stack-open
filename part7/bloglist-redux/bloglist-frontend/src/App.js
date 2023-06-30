import { React, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
// import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from './reducers/loginReducer'
import { initializeBlogs } from './reducers/blogReducer'
// import { setUsers } from './reducers/userReducer'
import { initializeUsers } from './reducers/userReducer'


const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)


  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  return (
    <div>
      <h1>Blog</h1>
      {!user ? (
        <LoginForm />
      ) : (
        <div>
          <p>hello, {user && user.username} 👋</p>
          <button onClick={logoutUser}>logout</button>
          <Togglable buttonLabel='Create New Blog'>
            <BlogForm />
          </Togglable>
          <h2>blogs</h2>
          {user && user.blogs && user.blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      )}
    </div>
  )
}

export default App
