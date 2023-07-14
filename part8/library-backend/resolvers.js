const GraphQLError = require('graphql').GraphQLError
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
const jwt = require('jsonwebtoken')
const DataLoader = require('dataloader')

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const bookLoader = new DataLoader(async (authorIds) => {
  const books = await Book.find({ author: { $in: authorIds } })
  const map = {}
  books.forEach(book => {
    if (!map[book.author]) map[book.author] = []
    map[book.author].push(book)
  })
  return authorIds.map(id => map[id] || [])
})

const authorLoader = new DataLoader(async (authorIds) => {
  const authors = await Author.find({ _id: { $in: authorIds } })
  const map = {}
  authors.forEach(author => {
    map[author._id.toString()] = author
  })
  return authorIds.map(id => map[id.toString()])
})

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
    allAuthors: async() => Author.find({}).populate('books'),
    me: async (root, args, context) => {
      return context.currentUser
    }
  },
  Author : {
    async bookCount(root) {
      const books = await bookLoader.load(root.id);
      return books.length
    }
  },
  Book: {
    async author(root) {
      return await authorLoader.load(root.author)
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

      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author })
      } try {
        await author.save()
      } catch (error) {
        throw new GraphQLError(error.message,{
          extension: {
            code : error.code,
            invalidArgs: args,
            error
          }
        })
      }
      const book = new Book({ ...args, author: author._id})
      try {
        await book.save()
      } catch (error) {
        throw new GraphQLError(error.message,{
          extension: {
            code : error.code,
            invalidArgs: args,
            error
          }
        })
      }
      pubsub.publish('BOOK_ADDED', { bookAdded: book })
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
      const { username, favoriteGenre } = args
      const createUser = new User({ username, favoriteGenre })

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
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    }
  }
}

module.exports = resolvers
