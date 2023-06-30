import React, { useState } from 'react'
import blogService from '../services/blogs'
import Notification from './Notification'
import loginService from '../services/login'
import { setLogin } from '../reducers/loginReducer'
import { useDispatch } from 'react-redux'

const LoginForm = ({ setUser, setErrorMessage , errorMessage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setLogin(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.error('Login error:', error)
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.error)
      } else {
        setErrorMessage('Login failed')
      }
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }


  return(
    <div>
      <Notification message={errorMessage} />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type='text'
            value={username}
            id='username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            id='password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit' id='login-button'>login</button>
      </form>
    </div>
  )
}


export default LoginForm
