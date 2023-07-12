import { useState } from 'react'
import { useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'


const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const login = (newToken) => {
    setToken(newToken)
    setPage('books')
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('books')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {!token
          ? <button onClick={() => setPage('login')}>login</button>
          : <button onClick={() => setPage('add')}>add book</button>}
        {!token
          ? null
          : <button onClick={logout}>logout</button>}
      </div>

      <Authors show={page === 'authors'} token={token}/>
      <Books show={page === 'books'}/>
      {!token
        ? <LoginForm show={page === 'login'} onLogin={login} setToken={setToken}/>
        : <NewBook show={page === 'add'}/>}
    </div>
  )
}

export default App
