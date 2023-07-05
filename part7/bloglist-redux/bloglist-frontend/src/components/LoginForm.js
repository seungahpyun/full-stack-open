import React from 'react'
import { loginUser } from '../reducers/loginReducer'
import { useDispatch } from 'react-redux'
import { initializeBlogs } from '../reducers/blogReducer'
import styled from 'styled-components'

const StyledContainer = styled.div`
  margin-top: 5rem;
  margin-bottom: 2rem;
  margin-left: auto;
  margin-right: auto;
  padding: 1rem;
  background-color: #f7f9fa;
  // width: 60%;
  // border: 1px solid #ced4da;
  // border-radius: 0.25rem;
  // box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledForm = styled.form`
  // width: 60%;
  margin-top: 2rem;
  margin-bottom: 2rem;
  margin-left: auto;
  margin-right: auto;
  padding: 1rem;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  background-color: #f7f9fa;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  `


const StyledInput = styled.input`
  width: 60%;
  margin-top: 1rem;
  &:hover {
    background-color: #343a40;
    border-color: #343a40;
  }`


const StyledButton = styled.button`
  width: 60%;
  margin-top: 1rem;
  &:hover {
    background-color: #343a40;
    border-color: #343a40;
  }`


const LoginForm = () => {
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    dispatch(loginUser(username, password))
    dispatch(initializeBlogs)
  }

  return(
    <StyledContainer>
      <div className="justify-content-md-center">
        <h1 className="text-center">Bloglist</h1>
        <StyledForm onSubmit={handleLogin}>
          <div>
            username
            <StyledInput
              type='text'
              id='username'
            />
          </div>
          <div>
            password
            <StyledInput
              type='password'
              id='password'
            />
          </div>
          <StyledButton type='submit' id='login-button'>login</StyledButton>
        </StyledForm>
      </div>
    </StyledContainer>
  )
}


export default LoginForm
