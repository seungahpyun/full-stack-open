import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { StyledContainer, StyledTable, StyledTh } from './StyledComponents'

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
    <StyledContainer>
      <h2>Users</h2>
      <StyledTable>
        <thead>
          <tr>
            <StyledTh></StyledTh>
            <StyledTh>blogs created</StyledTh>
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
      </StyledTable>
    </StyledContainer>
  )
}

export default Users
