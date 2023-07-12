const { createTestClient } = require('apollo-server-testing')
const { ApolloServer } = require('apollo-server')
const { typeDefs, resolvers } = require('../index')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const mongoose = require('mongoose')

let server

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

  server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null
      if (auth && auth.toLowerCase().startsWith('bearer ')) {
        const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
        const currentUser = await User.findById(decodedToken.id)
        return { currentUser }
      }
    },
  })
})

afterAll(async () => {
  await mongoose.disconnect()
})

const { query, mutate } = createTestClient(server)

describe('GraphQL API', () => {
  it('should return a list of books', async () => {
    const GET_BOOKS = `
      query {
        allBooks {
          title
          author {
            name
          }
        }
      }
    `

    const { data } = await query({ query: GET_BOOKS })
    expect(data.allBooks).toBeDefined()
  })
  it('should return a list of authors', async () => {
    const GET_AUTHORS = `
      query {
        allAuthors {
          name
          born
          bookCount
        }
      }
    `

    const { data } = await query({ query: GET_AUTHORS })
    expect(data.allAuthors).toBeDefined()
  })
  it('should return a list of books by genre', async () => {
    const GET_BOOKS_BY_GENRE = `
      query {
        allBooks(genres: "refactoring") {
          title
          author {
            name
          }
        }
      }
    `

    const { data } = await query({ query: GET_BOOKS_BY_GENRE })
    expect(data.allBooks).toBeDefined()
  })
  it('should return a list of books by author', async () => {
    const GET_BOOKS_BY_AUTHOR = `
      query {
        allBooks(author: "Martin Fowler") {
          title
          author {
            name
          }
        }
      }
    `

    const { data } = await query({ query: GET_BOOKS_BY_AUTHOR })
    expect(data.allBooks).toBeDefined()
  })
  it('should return a list of books by author and genre', async () => {
    const GET_BOOKS_BY_AUTHOR_AND_GENRE = `
      query {
        allBooks(author: "Martin Fowler", genres: "refactoring") {
          title
          author {
            name
          }
        }
      }
    `

    const { data } = await query({ query: GET_BOOKS_BY_AUTHOR_AND_GENRE })
    expect(data.allBooks).toBeDefined()
  })
  it('should return a list of users', async () => {
    const GET_USERS = `
      query {
        allUsers {
          username
          favoriteGenre
        }
      }
    `

    const { data } = await query({ query: GET_USERS })
    expect(data.allUsers).toBeDefined()
  })
  it('should return a user', async () => {
    const GET_USER = `
      query {
        me {
          username
          favoriteGenre
        }
      }
    `

    const { data } = await query({ query: GET_USER })
    expect(data.me).toBeDefined()
  })
  it('should add a book', async () => {
    const ADD_BOOK = `
      mutation {
        addBook(
          title: "Test Book"
          author: "Test Author"
          published: 2020
          genres: ["test", "testing"]
        )
        {
          title
          author {
            name
          }
        }
      }
    `
    const { data } = await mutate({ mutation: ADD_BOOK })
    expect(data.addBook).toBeDefined()
  })
  it('should edit an author', async () => {
    const EDIT_AUTHOR = `
      mutation {
        editAuthor(
          name: "Test Author"
          setBornTo: 2020
        )
        {
          name
          born
        }
      }
    `
    const { data } = await mutate({ mutation: EDIT_AUTHOR })
    expect(data.editAuthor).toBeDefined()
  })
  it('should login a user', async () => {
    const LOGIN = `
      mutation {
        login(
          username: "test"
          password: "test"
        )
        {
          value
        }
      }
    `
    const { data } = await mutate({ mutation: LOGIN })
    expect(data.login).toBeDefined()
  })
  it('should create a user', async () => {
    const CREATE_USER = `
      mutation {
        createUser(
          username: "test"
          password: "test"
          favoriteGenre: "test"
        )
        {
          username
          favoriteGenre
        }
      }
    `
    const { data } = await mutate({ mutation: CREATE_USER })
    expect(data.createUser).toBeDefined()
  })
})
