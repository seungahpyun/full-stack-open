import { React, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User'
import { logoutUser } from './reducers/loginReducer'
import { Link, Route, Routes } from 'react-router-dom'
import Blog from './components/Blog'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.login)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  const Home = () => (
    <div>
      <h2>Blog App</h2>
      <p>hello, {user && user.username} 👋</p>
      <p>{user && user.username} logged in</p>
      <button onClick={() => dispatch(logoutUser())}>logout</button>
      <Users />
      <BlogList />
    </div>
  )

  return (
    <div>
      <h1>Blog</h1>
      <Notification />
      {user && (
        <div>
          <Link to="/">home</Link>
          <Link to="/users">users</Link>
          <Link to="/blogs">blogs</Link>
        </div>
      )}
      <Routes>
        <Route path='/' element={user ? <Home /> : <LoginForm />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User/>} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/blogs/:id" element={<Blog />} />
      </Routes>
    </div>
  )
}

export default App
