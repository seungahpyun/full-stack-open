import React from 'react'
import { loginUser } from '../reducers/loginReducer'
import { useDispatch } from 'react-redux'
import { initializeBlogs } from '../reducers/blogReducer'
import Layout from './Layout'
import { Container,Button, Form, Input } from './StyledComponents'

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
      <Container>
        <div>
          <h1>Bloglist</h1>
          <Form onSubmit={handleLogin}>
            <Input
              type='text'
              id='username'
              placeholder='username'
            />
            <Input
              type='password'
              id='password'
              placeholder='password'
            />
            <Button type='submit' id='login-button'>login</Button>
          </Form>
        </div>
      </Container>
    </Layout>
  )
}


export default LoginForm
