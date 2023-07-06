import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { StyledBlogListContainer, StyledBlogListGroup } from './StyledComponents'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)

  return (
    <StyledBlogListContainer>
      <StyledBlogListGroup>
        {[...blogs].sort((a, b) => b.likes - a.likes).map(blog =>
          <div key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </div>
        )}
      </StyledBlogListGroup>
    </StyledBlogListContainer>
  )
}

export default BlogList
