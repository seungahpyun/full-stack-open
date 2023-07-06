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
import { StyledButton, StyledContainer, StyledLink, StyledNav, StyledTitle } from './components/StyledComponents'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.login)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  return (
    <div className="container">
      <StyledContainer>
        {user && (
          <div>
            <StyledNav>
              <div>
                <StyledTitle>Bloglist</StyledTitle>
              </div>
              <div>
                <div>
                  <StyledLink to="/">Bloglist</StyledLink>
                  <StyledLink to="/users">Users</StyledLink>
                </div>
                <div>
                  <span>{`${user.username} logged in`}</span>
                  <StyledButton onClick={() => dispatch(logoutUser())}>Logout</StyledButton>
                </div>
              </div>
            </StyledNav>
          </div>
        )}
        <Notification />

        <Routes>
          <Route path='/' element={user ? <BlogList />: <LoginForm />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User/>} />
          <Route path="/blogs/:id" element={<Blog />} />
        </Routes>
      </StyledContainer>
    </div>
  )
}

export default App
