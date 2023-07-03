import { React, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from './reducers/loginReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import BlogList from './components/BlogList'
import Nodification from './components/Notification'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.login)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  return (
    <div>
      <h1>Blog</h1>
      <Nodification />
      {!user ? (
        <LoginForm />
      ) : (
        <div>
          <p>hello, {user && user.username} 👋</p>
          <button onClick={() => dispatch(logoutUser())}>logout</button>
          <BlogList />
        </div>
      )}
    </div>
  )
}

export default App