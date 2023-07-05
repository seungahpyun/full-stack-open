import React from 'react'
import { loginUser } from '../reducers/loginReducer'
import { useDispatch } from 'react-redux'
import { initializeBlogs } from '../reducers/blogReducer'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import styled from 'styled-components'

const StyledContainer = styled(Container)`
  margin-top: 5rem;
  margin-bottom: 2rem;
  margin-left: auto;
  margin-right: auto;
  padding: 1rem;
  background-color: #f7f9fa;
`

const StyledForm = styled(Form)`
  width: 60%;
  margin-top: 2rem;
  margin-bottom: 2rem;
  margin-left: auto;
  margin-right: auto;
  padding: 1rem;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  background-color: #f7f9fa;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);`

const StyledButton = styled(Button)`
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
      <Row className="justify-content-md-center">
        <Col xs={12} md={4}>
          <h1 className="text-center">Bloglist</h1>
          <StyledForm onSubmit={handleLogin} className="mt-4">
            <Form.Group>
              <Form.Label>username</Form.Label>
              <Form.Control type='text' id='username' placeholder='Enter Username'/>
            </Form.Group>
            <Form.Group>
              <Form.Label>password</Form.Label>
              <Form.Control type='password' id='password' placeholder='Password'/>
            </Form.Group>
            <Col xs={12} className="text-center">
              <StyledButton variant="primary" type='submit' id='login-button' block>Login</StyledButton>
            </Col>
          </StyledForm>
        </Col>
      </Row>
    </StyledContainer>
  )
}


export default LoginForm
