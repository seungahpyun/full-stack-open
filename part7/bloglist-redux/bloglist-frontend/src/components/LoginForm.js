import React from 'react'
import blogService from '../services/blogs'
import Notification from './Notification'
import loginService from '../services/login'
import loginReducer from '../reducers/loginReducer'
import { useDispatch } from 'react-redux'

const LoginForm = () => {
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    const user = await loginService.login({ username, password })
    dispatch(loginReducer.loginUser(user))
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    blogService.setToken(user.token)
  }


  return(
    <div>
      <Notification />
      <form onSubmit={handleLogin}>
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
        <button type='submit' id='login-button'>login</button>
      </form>
    </div>
  )
}


export default LoginForm
