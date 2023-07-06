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
import { StyledButton, StyledContainer, StyledHeader, StyledHeaderLink, StyledLink, StyledNav } from './components/StyledComponents'
import BlogForm from './components/BlogForm'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.login)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  return (
    <StyledContainer>
      <StyledHeader>
        {user && (
          <div>
            <StyledHeaderLink to='/'>Bloglist</StyledHeaderLink>
            <StyledNav>
              <div>
                <div className="dropdown">
                  <span>Menu</span>
                  <div className="dropdown-content">
                    <p>{user.username}</p>
                    <hr />
                    <StyledLink to="/">Blogs</StyledLink>
                    <StyledLink to="/users">Users</StyledLink>
                    <StyledLink to="/create">Create</StyledLink>
                    <hr />
                    <StyledButton onClick={() => dispatch(logoutUser())}>Logout</StyledButton>
                  </div>
                </div>
              </div>
            </StyledNav>
          </div>
        )}
      </StyledHeader>
      <Notification />
      <Routes>
        <Route path="/" element={user ? <BlogList /> : <LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/users" element={<Users />} />
        <Route path="/create" element={<BlogForm />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/:id" element={<Blog />} />
      </Routes>
    </StyledContainer>
  )
}

export default App
