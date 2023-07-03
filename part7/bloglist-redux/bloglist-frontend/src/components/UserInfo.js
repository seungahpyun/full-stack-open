import React from 'react'
import { useSelector } from 'react-redux'
import { logoutUser } from '../reducers/loginReducer'
import { useDispatch } from 'react-redux'

const UserInfo = () => {
  const userInfo = useSelector(state => state.users)
  const dispatch = useDispatch()

  console.log(userInfo)
  const users = userInfo
    ? userInfo.map(user => {
      return {
        id: user.id,
        name: user.username,
        blogs: user.blogs,
      }
    })
    : []
  console.log(users[0])


  return (
    <div>
      <button onClick={() => dispatch(logoutUser())}>logout</button>
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
    </div>
  )
}

export default UserInfo
