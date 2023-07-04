import React from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

const UserInfo = () => {
  const userInfo = useSelector(state => state.users)

  const users = userInfo
    ? userInfo.map(user => {
      return {
        id: user.id,
        name: user.username,
        blogs: user.blogs,
      }
    })
    : []

  if (!users) {
    return null
  }

  return (
    <Router>
      <Routes>
        <Route path="/users" />
      </Routes>
      <div>
        <h2>Users</h2>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>blogs created</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Router>
  )
}

export default UserInfo


{/* <div>
<h2>Users</h2>
<table>
  <thead>
    <tr>
      <th></th>
      <th>blogs created</th>
    </tr>
  </thead>
  <tbody>
    {users.map(user => (
      <tr key={user.id}>
        <td>{user.name}</td>
        <td>{user.blogs.length}</td>
      </tr>
    ))}
  </tbody>
</table>
</div> */}
