import { useState } from 'react'
import { useApolloClient, useSubscription} from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'

import { ALL_BOOKS, BOOK_ADDED } from './queries'

export const updateCache = (addedBook) => {
  return (cache, { data }) => {
    const includedIn = (set, object) => set.map((p) => p.id).includes(object.id)

    const dataInStore = cache.readQuery({ query: ALL_BOOKS })
    if (dataInStore && !includedIn(dataInStore.allBooks, addedBook)) {
      cache.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      })
    }
  }
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [notification, setNotification] = useState(null)
  const client = useApolloClient()
  const [bookAddedAlreadyHandled, setBookAddedAlreadyHandled] = useState(false)

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded

      if (!bookAddedAlreadyHandled) {
        setBookAddedAlreadyHandled(true)

        window.alert(`${addedBook.title} added`)
        updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
      } else {
        setBookAddedAlreadyHandled(false)
      }
    }
  })

  const handleNotificationClose = () => {
    setNotification(null)
  }

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

      <Authors show={page === 'authors'} />
      <Books show={page === 'books'}/>
      {!token
        ? <LoginForm show={page === 'login'} onLogin={login} setToken={setToken}/>
        : <>
            <NewBook show={page === 'add'}/>
            <Recommend show={page === 'recommendations'}/>
          </>
      }

      {notification && (
        <div className="notification">
          <p>{notification}</p>
          <button onClick={handleNotificationClose}>Close</button>
        </div>
      )}
    </div>
  )
}

export default App
