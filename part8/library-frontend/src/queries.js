import { gql } from '@apollo/client'

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

const ALL_BOOKS = gql`
  query {
    allBooks ($author: String, $genres: String){
      title
      author
      published
    }
  }
`

export { ALL_AUTHORS, ALL_BOOKS }
