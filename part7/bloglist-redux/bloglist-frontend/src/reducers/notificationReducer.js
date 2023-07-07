import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification: (state, action) => { return action.payload },
    clearNotification: () => { return null },
  },
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const showNotification = (message, type, seconds) => {
  return async (dispatch) => {
    dispatch(clearNotification())
    dispatch(setNotification({ message, type }))
    setTimeout(() => {
      dispatch(clearNotification())
    }, seconds * 1000)
  }
}


export default notificationSlice.reducer
