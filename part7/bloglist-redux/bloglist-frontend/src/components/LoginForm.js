import React from 'react'
import { loginUser } from '../reducers/loginReducer'
import { useDispatch } from 'react-redux'
import { initializeBlogs } from '../reducers/blogReducer'
// import { showNotification } from '../reducers/notificationReducer'
import Layout from './Layout'
import { StyledLoginContainer,StyledButton, StyledLoginForm, StyledInput } from './StyledComponents'

const LoginForm = () => {
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value

    dispatch(loginUser(username, password))
    dispatch(initializeBlogs())

    event.target.username.value = ''
    event.target.password.value = ''
  }

  return(
    <Layout>
      <StyledLoginContainer>
        <div className="justify-content-md-center">
          <h1 className="text-center">Bloglist</h1>
          <StyledLoginForm onSubmit={handleLogin}>
            <StyledInput
              type='text'
              id='username'
              placeholder='username'
            />
            <StyledInput
              type='password'
              id='password'
              placeholder='password'
            />
            <StyledButton type='submit' id='login-button'>login</StyledButton>
          </StyledLoginForm>
        </div>
      </StyledLoginContainer>
    </Layout>
  )
}


export default LoginForm
