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
import { Navbar, Nav } from 'react-bootstrap'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.login)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  return (
    <div className="container">
      {user && (
        <Navbar>
          <Navbar.Brand as={Link} to="/">Bloglist</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/">blogs</Nav.Link>
              <Nav.Link as={Link} to="/users">users</Nav.Link>
            </Nav>
            <Nav className="ml-auto">
              <span className="navbar-text">{`${user.username} logged in `}</span>
              <button className="btn btn-link nav-link" onClick={() => dispatch(logoutUser())}>logout</button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      )}
      <h1>Blog</h1>
      <Notification />
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
