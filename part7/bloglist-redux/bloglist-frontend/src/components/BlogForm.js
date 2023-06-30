import React from 'react'
import blogService from '../services/blogs'
import blogReducer from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import notificationReducer from '../reducers/notificationReducer'

const BlogForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value

    const blog = await blogService.create({ title, author, url })
    dispatch(blogReducer.addBlog(blog))
    dispatch(notificationReducer.setNotification(`a new blog ${blog.title} by ${blog.author} added`, 5))
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
  }



  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
            title:
          <input
            type='text'
            id='title'
          />
        </div>
        <div>
            author:
          <input
            type='text'
            id='author'
          />
        </div>
        <div>
            url:
          <input
            type='text'
            id='url'
          />
        </div>
        <button id='create-blog-button' type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
