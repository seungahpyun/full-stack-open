import React from 'react'
import { useSelector } from 'react-redux'


import { Container, StyledBlogListGroup,LinkItem } from './StyledComponents'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)

  return (
    <div>
      <Container>
        <StyledBlogListGroup>
          {[...blogs].sort((a, b) => b.likes - a.likes).map(blog =>
            <div key={blog.id}>
              <LinkItem to={`/blogs/${blog.id}`}>{blog.title}</LinkItem>
            </div>
          )}
        </StyledBlogListGroup>
      </Container>
    </div>
  )
}

export default BlogList
