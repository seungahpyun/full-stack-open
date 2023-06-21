import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification: (state, action) => {
      state = action.payload
      return state
    },
    clearNotification: (state) => {
      state = null
      return state
    }
  },
})

export const setNotification = (content, time) => {
  return async (dispatch) => {
    dispatch(notificationSlice.actions.setNotification(content))
    setTimeout(() => {
      dispatch(notificationSlice.actions.clearNotification())
    }, time * 1000)
  }
}

export default notificationSlice.reducer
