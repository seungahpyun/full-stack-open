require('dotenv').config()

const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const GraphQLError = require('graphql').GraphQLError
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = `
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genres: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }
  type User {
    username: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!,
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author,
    createUser(
      username: String!
    ): User,
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: async() => Book.collection.countDocuments(),
    authorCount: async() => Author.collection.countDocuments(),
    allBooks: async(root, args) => {
      let filter = {}
      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        if (author) {
          filter.author = author._id
        }
      }
      if (args.genres) {
        filter.genres = args.genres
      }
      return Book.find(filter)
    },
    allAuthors: async() => Author.find({}),
    me: async (root, args, context) => {
      return context.currentUser
    }
  },
  Author : {
    bookCount: async(root) => {
      return Book.find({author: root.id}).countDocuments()
    }
  },
  Mutation: {
    addBook: async(root, args,context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }

      let author = await Author.findOne({name: args.author})
      if (!author) {
        author = new Author({ name: args.author })
        await author.save()
      }
      const book = new Book({ ...args, author: author._id })
      try {
        await book.save()
      }
      catch (error) {
        throw new GraphQLError(error.message,{
          extension: {
            code : error.code,
            invalidArgs: args,
            error
          }
        })
      }
      return book
    },
    editAuthor: async(root, args,context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError("not authenticated")
      }

      const author = await Author.findOne({name: args.name})
      if (!author) {
        return null
      }
      author.born = args.setBornTo
      try {
        await author.save()
      }
      catch (error) {
        throw new GraphQLError(error.message),{
          extension: {
            code : error.code,
            invalidArgs: args,
            error
          }
        }
      }
      return author
    },
    createUser: async(root, args) => {
      createUser = new User({ username: args.username })
      try{
        await createUser.save()
      }
      catch (error) {
        throw new GraphQLError(error.message),{
          extension: {
            code : error.code,
            invalidArgs: args,
            error
          }
        }
      }
      return createUser
    },
    login: async(root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'secret') {
        throw new GraphQLError("wrong credentials"),{
          extension: {
            code : "WRONG_CREDENTIALS",
          }
        }
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      }
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  }
}


const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: {
    origin: '*',
    credentials: true
  },
  context: async({ req }) => {
    console.log(req)  // Log the entire request
    const auth = req ? req.headers.authorization : null
    console.log(auth)  // Log the authorization header
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      try {
        const decodedToken = jwt.verify(
          auth.substring(7), process.env.JWT_SECRET
        )
        const currentUser = await User.findById(decodedToken.id)
        return { currentUser }
      } catch (error) {
        console.error('JWT verification failed:', error)
      }
    }
  }

})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
