import React from 'react'
import blogService from '../services/blogs'
import Notification from './Notification'
import loginService from '../services/login'
import { useNotification } from '../NotificationContext'
import { useUser } from '../UserContext'

const LoginForm = () => {
  const { setNotification } = useNotification()
  const { dispatch } = useUser()

  const handleLogin = async (event) => {
    event.preventDefault()

    const username = event.target.username.value
    const password = event.target.password.value
    event.target.username.value = ''
    event.target.password.value = ''

    console.log('Logging in with', username, password)
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch({ type: 'SET_USER', data: user })
      setNotification(null)
    } catch (error) {
      if (error.response && error.response.data) {
        setNotification(error.response.data.error)
      } else {
        setNotification('Error occurred during login')
      }
    }
  }

  return (
    <div>
      <Notification />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input type="text" id="username" />
        </div>
        <div>
          password
          <input type="password" id="password" />
        </div>
        <button type="submit" id="login-button">
          login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
