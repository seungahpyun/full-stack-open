import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import { setNotification } from './notificationReducer'


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
      dispatch(setNotification(`Welcome ${user.name}`, 'success', 5))
    }
    catch (exception) {
      console.error('Login error:', exception)
      if (exception.response && exception.response.data) {
        dispatch(setNotification(exception.response.data.error, 'error', 5))
      } else {
        dispatch(setNotification('Error occurred during login', 'error', 5))
      }
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
