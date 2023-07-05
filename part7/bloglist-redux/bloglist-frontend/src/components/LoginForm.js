import React from 'react'
import Notification from './Notification'
import { loginUser } from '../reducers/loginReducer'
import { useDispatch } from 'react-redux'
import { initializeBlogs } from '../reducers/blogReducer'
import { Form, Button } from 'react-bootstrap'


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
    <div>
      <Notification />
      <Form onSubmit={handleLogin}>
        <div>
          username
          <input
            type='text'
            id='username'
          />
        </div>
        <div>
          password
          <input
            type='password'
            id='password'
          />
        </div>
        <Button type='submit' id='login-button'>login</Button>
      </Form>
    </div>
  )
}


export default LoginForm
