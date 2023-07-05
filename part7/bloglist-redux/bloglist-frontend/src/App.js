import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Route, Routes } from 'react-router-dom'
import styled from 'styled-components'

import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { logoutUser } from './reducers/loginReducer'

import BlogList from './components/BlogList'
import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'


const StyledContainer = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-left: auto;
  margin-right: auto;
  padding: 1rem;
  width: 100%;

`

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background-color: #f7f9fa;
  width: 70%;
  margin-left: auto;
  margin-right: auto;

`

const StyledLink = styled(Link)`
  margin-right: 1rem;
  text-decoration: none;
  color: black;
`

const StyledTitle = styled.h2`
  margin-bottom: 0;
  margin-left: auto;
  margin-right: auto;
  padding: 1rem;
`

const StyledButton = styled.button`
  margin-left: 1rem
  padding: 0.5rem;
  &:hover {
    background-color: #23272b;
  }
`

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
            <div>
              <StyledTitle>Bloglist</StyledTitle>
            </div>
            <StyledNav>
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
