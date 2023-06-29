import { createSlice } from '@reduxjs/toolkit'

const loginSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    setLogin: (state, action) => action.payload,
    clearLogin: () => null,
  },
})

export const { setLogin, clearLogin } = loginSlice.actions

export default loginSlice.reducer
