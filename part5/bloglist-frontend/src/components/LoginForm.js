import React, { useState } from 'react'
import blogService from '../services/blogs'
import Notification from './Notification'
import loginService from '../services/login'

const LoginForm = ({ setUser, setErrorMessage , errorMessage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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
      setErrorMessage(null)
    } catch (error) {
      console.error('Login error:', error)
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.error)
      } else {
        setErrorMessage('Error occurred during login')
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
            type="text"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}


export default LoginForm
