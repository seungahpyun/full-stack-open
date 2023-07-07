import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'

import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { logoutUser } from './reducers/loginReducer'

import BlogList from './components/BlogList'
import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import { Button, Container, HeaderLink, LinkItem, Nav } from './components/StyledComponents'
import BlogForm from './components/BlogForm'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.login)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  return (
    <Container>
      <div>
        {user && (
          <Nav>
            <div>
              <HeaderLink to='/'>Bloglist</HeaderLink>
              <div>
                <LinkItem to="/">Blogs</LinkItem>
                <LinkItem to="/users">Users</LinkItem>
                <LinkItem to="/create">Create</LinkItem>
                <div className="dropdown">
                  <span>{user.username}</span>
                  <div className="dropdown-content">
                    <Button onClick={() => dispatch(logoutUser())}>Logout</Button>
                  </div>
                </div>
              </div>
            </div>
          </Nav>
        )}
      </div>
      <Notification />
      <Routes>
        <Route path="/" element={user ? <BlogList /> : <LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/users" element={<Users />} />
        <Route path="/create" element={<BlogForm />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/:id" element={<Blog />} />
      </Routes>
    </Container>
  )
}

export default App
