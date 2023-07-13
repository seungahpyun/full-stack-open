import { useState } from 'react'
import { useApolloClient, useSubscription } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'

import { ALL_BOOKS, BOOK_ADDED } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map((p) => p.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      alert(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    }
  })

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
          : <>
              <button onClick={() => setPage('add')}>add book</button>
              <button onClick={() => setPage('recommendations')}>recommendations</button>
            </>}
        {!token
          ? null
          : <button onClick={logout}>logout</button>}
      </div>

      <Authors show={page === 'authors'} token={token}/>
      <Books show={page === 'books'}/>
      {!token
        ? <LoginForm show={page === 'login'} onLogin={login} setToken={setToken}/>
        : <>
            <NewBook show={page === 'add'}/>
            <Recommend show={page === 'recommendations'}/>
          </>
      }
    </div>
  )
}

export default App
