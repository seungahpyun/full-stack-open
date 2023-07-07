import React from 'react'
import { useSelector } from 'react-redux'


import { Container, BlogListGroup,LinkItem } from './StyledComponents'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)

  return (
    <div>
      <Container>
        <BlogListGroup>
          {[...blogs].sort((a, b) => b.likes - a.likes).map(blog =>
            <div id = 'each-blog' key={blog.id}>
              <LinkItem to={`/blogs/${blog.id}`}>{blog.title}</LinkItem>
            </div>
          )}
        </BlogListGroup>
      </Container>
    </div>
  )
}

export default BlogList
