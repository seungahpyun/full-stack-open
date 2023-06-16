import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({blogs, setBlogs, setErrorMessage, blogFormRef}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleSubmit = (event) => {
      event.preventDefault()
      const newBlog = {
        title,
        author,
        url,
      }
      handleCreateBlog(newBlog)
      setTitle('')
      setAuthor('')
      setUrl('')

    }

    const handleCreateBlog = async (blog) => {
      try {
        blogFormRef.current.toggleVisibility()
        const createdBlog = await blogService.create(blog)
        setBlogs(blogs.concat(createdBlog))
        setErrorMessage(`a new blog ${createdBlog.title} by ${createdBlog.author} added`)
      } catch (error) {
        console.error('Create blog error:', error)
        if (error.response && error.response.data) {
          setErrorMessage(error.response.data.error)
        } else {
          setErrorMessage('Error occurred during blog creation')
        }
      }
    }

    return (
      <div>
        <h2>Create new</h2>
        <form onSubmit={handleSubmit}>
          <div>
              title:
              <input
                  type="text"
                  value={title}
                  name="title"
                  onChange={({ target }) => setTitle(target.value)}
              />
          </div>
          <div>
              author:
              <input
                  type="text"
                  value={author}
                  name="author"
                  onChange={({ target }) => setAuthor(target.value)}
              />
          </div>
          <div>
              url:
              <input
                  type="text"
                  value={url}
                  name="url"
                  onChange={({ target }) => setUrl(target.value)}
              />
          </div>
          <button type="submit">create</button>

        </form>
      </div>
  )
}

export default BlogForm
