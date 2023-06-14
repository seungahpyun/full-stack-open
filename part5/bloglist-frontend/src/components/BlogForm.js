import React, { useState } from 'react'


const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    // const [likes, setLikes] = useState(0)
    const handleCreateBlog = async (event) => {
        event.preventDefault()
        createBlog({
            title,
            author,
            url,
            // likes,
        })
        setTitle('')
        setAuthor('')
        setUrl('')
        // setLikes(0)
    };
    return (
      <div>
          <h2>Create new</h2>
          <form onSubmit={handleCreateBlog}>
              <div>
                  title:
                  <input
                      id="title"
                      type="text"
                      value={title}
                      name="Title"
                      onChange={({ target }) => setTitle(target.value)}
                  />
              </div>
              <div>
                  author:
                  <input
                      id="author"
                      type="text"
                      value={author}
                      name="Author"
                      onChange={({ target }) => setAuthor(target.value)}
                  />
              </div>
              <div>
                  url:
                  <input
                      id="url"
                      type="text"
                      value={url}
                      name="Url"
                      onChange={({ target }) => setUrl(target.value)}
                  />
              </div>
              {/*<div>
                  likes:
                  <input
                      id="likes"
                      type="number"
                      value={likes}
                      name="Likes"
                      onChange={({ target }) => setLikes(target.value)}
                  />*/}
              <div>
                  <button id="create-blog-button" type="submit">create</button>
              </div>
          </form>
      </div>
  )
}

export default BlogForm
