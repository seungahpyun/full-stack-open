import React, { useState } from 'react'


const BlogForm = ({handleCreateBlog}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    // const [likes, setLikes] = useState(0)

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
                {/* <div>
                    likes:
                    <input
                        type="number"
                        value={likes}
                        name="likes"
                        onChange={({ target }) => setLikes(target.value)}
                    />
                </div> */}
                <button type="submit">create</button>
            </form>
        </div>
  )
}

export default BlogForm
