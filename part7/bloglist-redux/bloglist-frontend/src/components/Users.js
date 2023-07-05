import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledContainer = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-left: auto;
  margin-right: auto;
  padding: 1rem;
  width: 100%;
  flex-direction: column;
  align-items: center;
  text-align: center;
`

const StyledTable = styled.table`
  width: 50%;
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-left: auto;
  margin-right: auto;
  padding: 1rem;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  background-color: #f7f9fa;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  `

const StyledTh = styled.th`
  text-align: left;
  padding: 0.5rem;
  border-bottom: 1px solid #ced4da;
  `

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
