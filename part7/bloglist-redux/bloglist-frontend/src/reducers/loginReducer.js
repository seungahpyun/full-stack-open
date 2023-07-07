import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import { showNotification } from './notificationReducer'
import blogService from '../services/blogs'

const loginSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    setLogin: (state, action) => action.payload,
    setLogout: () => null,
  },
})

export const { setLogin, setLogout } = loginSlice.actions

export const loginUser = (username, password) => {
  return async dispatch => {
    try{
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      dispatch(setLogin(user))
      dispatch(showNotification(`Welcome ${user.username}`, 'success', 3))
      blogService.setToken(user.token)
    }
    catch (exception) {
      console.error('Login error:', exception)
      let errorMessage = 'An unknown error occurred during login'
      if (exception.response && exception.response.data) {
        errorMessage = exception.response.data.error
      }
      dispatch(showNotification(errorMessage, 'error', 3))
    }
  }
}


export const logoutUser = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setLogout(null))
  }
}

export const initializeLogin = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setLogin(user))
    }
  }
}

export default loginSlice.reducer
