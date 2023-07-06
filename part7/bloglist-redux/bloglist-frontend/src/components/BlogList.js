import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import BlogForm from './BlogForm'
import { StyledButton, StyledBlogContainer, StyledBlogListGroup } from './StyledComponents'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  const [showForm, setShowForm] = useState(false)

  const toggleForm = () => {
    setShowForm(!showForm)
  }

  return (
    <StyledBlogContainer>
      <StyledButton onClick={toggleForm}>
        {showForm ? 'Cancel' : 'Create New'}
      </StyledButton>
      {showForm && <BlogForm />}
      <StyledBlogListGroup>
        {[...blogs].sort((a, b) => b.likes - a.likes).map(blog =>
          <div key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </div>
        )}
      </StyledBlogListGroup>
    </StyledBlogContainer>
  )
}

export default BlogList
