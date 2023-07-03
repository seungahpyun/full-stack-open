import React from 'react'
import blogService from '../services/blogs'
import { addBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { showNotification }  from '../reducers/notificationReducer'

const BlogForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()

    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value

    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
    const newBlog = await blogService.create({ title, author, url })
    dispatch(addBlog(newBlog))
    dispatch(showNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`, 5))
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
