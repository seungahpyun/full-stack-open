import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container, Table, Th } from './StyledComponents'

const Users = () => {
  const userlist = useSelector(state => state.users)

  const users = userlist
    ? userlist.map(user => {
      return {
        id: user.id,
        name: user.username,
        blogs: user.blogs,
      }
    })
    : []

  return (
    <Container>
      <h2>Users</h2>
      <Table>
        <thead>
          <tr>
            <Th></Th>
            <Th>blogs created</Th>
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
      </Table>
    </Container>
  )
}

export default Users
