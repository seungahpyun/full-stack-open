import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const Recommend = ({ show }) => {
  const [books, setBooks] = useState(null)
  const [genre, setGenre] = useState(null)
  const result = useQuery(ALL_BOOKS)
  const userResult = useQuery(ME)

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result])

  useEffect(() => {
    if (userResult.data) {
      setGenre(userResult.data.me.favoriteGenre)
    }
  }, [userResult])

  if (!show) {
    return null
  }

  if (result.loading || userResult.loading) {
    return <div>loading...</div>
  }

  if (!result.data || !userResult.data) {
    return <div>No data!</div>
  }

  const filteredBooks = books.filter(b => b.genres.includes(genre))

  return (
    <div>
      <h2>recommendations</h2>
      <div>books in your favorite genre <b>{genre}</b></div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
            {filteredBooks.map(b =>
              <tr key={b.title}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
              </tr>
            )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend
