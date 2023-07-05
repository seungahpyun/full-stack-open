import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import BlogForm from './BlogForm'
import styled from 'styled-components'

const StyledListGroup = styled.div`
  width: 50%;
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-left: auto;
  margin-right: auto;
  padding: 1rem;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  background-color: #f7f9fa;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);`


const StyledButton = styled.button`
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-left: auto;
  margin-right: auto;
  padding: 0.5rem;
  width: 50%;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  background-color: #f7f9fa;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);`

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  const [showForm, setShowForm] = useState(false)

  const toggleForm = () => {
    setShowForm(!showForm)
  }

  return (
    <div>
      <StyledButton onClick={toggleForm} id='create-cancel-button'>
        {showForm ? 'Cancel' : 'Create New'}
      </StyledButton>
      {showForm && <BlogForm />}
      <StyledListGroup>
        {[...blogs].sort((a, b) => b.likes - a.likes).map(blog =>
          <div key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </div>
        )}
      </StyledListGroup>
    </div>
  )
}

export default BlogList
