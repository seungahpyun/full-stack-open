// import React, { useState } from 'react'
// import { useQuery } from '@apollo/client'
// import { ALL_BOOKS } from '../queries'

// const Books = (props) => {
//   const [filter, setFilter] = useState('all genres')
//   const result = useQuery(ALL_BOOKS)

//   if (result.error) {
//     console.log(result.error)
//     return <div>Error!</div>
//   }

//   if (!props.show) {
//     return null
//   }

//   if (!result.data) {
//     return <div>No data!</div>
//   }

//   const books = result.data.allBooks

//   const genres = books.map(b => b.genres).flat()
//   const uniqueGenres = [...new Set(genres)]

//   const filterBooks = (genre) => {
//     setFilter(genre)
//   }

//   if (filter === 'all genres') {
//     setFilter('all genres')
//   }


//   return (
//     <div>
//       <h2>books</h2>
//       <table>
//         <tbody>
//           <tr>
//             <th></th>
//             <th>author</th>
//             <th>published</th>
//           </tr>
//           {filterBooks.map(b =>
//             <tr key={b.title}>
//               <td>{b.title}</td>
//               <td>{b.author.name}</td>
//               <td>{b.published}</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//       <div>
//         {uniqueGenres.map(g =>
//           <button key={g} onClick={() => filterBooks(g)}>{g}</button>
//         )}
//         <button onClick={() => filterBooks('all genres')}>all genres</button>
//       </div>
//     </div>
//   )
// }

// export default Books


import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)

  if (result.loading) {
    return <div>loading...</div>
  }

  if (result.error) {
    console.log(result.error)
    return <div>Error!</div>
  }

  if (!props.show) {
    return null
  }

  if (!result.data) {
    return <div>No data!</div>
  }

  const books = result.data.allBooks

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
