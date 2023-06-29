import { createSlice } from '@reduxjs/toolkit'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs: (state, action) => action.payload,
    addBlog: (state, action) => state.concat(action.payload),
    updateBlog: (state, action) => {
      const updatedBlog = action.payload
      return state.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog)
    }
  }
})

export const { setBlogs, addBlog, updateBlog } = blogSlice.actions

export default blogSlice.reducer
