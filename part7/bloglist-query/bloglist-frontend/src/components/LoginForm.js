import React, { useState } from 'react'
import blogService from '../services/blogs'
import Notification from './Notification'
import loginService from '../services/login'
import { useNotification } from '../NotificationContext'


const LoginForm = ({ setUser, errorMessage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { setNotification } = useNotification()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNotification(null)
    } catch (error) {
      console.error('Login error:', error)
      if (error.response && error.response.data) {
        setNotification(error.response.data.error)
      } else {
        setNotification('Error occurred during login')
      }
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
