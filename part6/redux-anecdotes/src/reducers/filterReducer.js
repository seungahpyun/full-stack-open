import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: 'ALL',
  reducers: {
    setFilter: (state, action) => {
      state = action.payload
      return state
    },
  },
})

export const { setFilter } = filterSlice.actions
export default filterSlice.reducer
