import { useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'

const User = () => {
  const { id } = useParams()
  const user = useSelector(state => state.users.find(user => user.id === id))

  if (!user) {
    return null
  }

  const { username: name, blogs } = user

  if (!blogs) {
    return (
      <div>
        <h2>{name}</h2>
        <h3>No blogs added yet</h3>
      </div>
    )
  }

  return (
    <div>
      <h2>{name}</h2>
      <h3>added blogs</h3>
      <ul>
        {blogs.map(blog => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default User
