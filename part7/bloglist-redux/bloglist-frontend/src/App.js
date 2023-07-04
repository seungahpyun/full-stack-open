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

  return (
    <div>
      <h1>Blog</h1>
      <Notification />
      {user && (
        <div>
          <Link to="/">blogs</Link>
          <Link to="/users">users</Link>
          <p>{user && user.username} logged in <button onClick={() => dispatch(logoutUser())}>logout</button></p>
        </div>
      )}
      <Routes>
        <Route path='/' element={user ? <BlogList />: <LoginForm />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User/>} />
        <Route path="/blogs/:id" element={<Blog />} />
      </Routes>
    </div>
  )
}

export default App
