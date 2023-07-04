const config = require("../utils/config")
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  if (blog) {
    response.json(blog.toJSON())
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  const token = request.token
  const user = request.user

  const decodedToken = jwt.verify(token, config.SECRET)

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  if (!user) {
    return response.status(401).json({ error: 'user not found' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
    comments: []
  })

  const savedBlog = await blog.save()

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    { $push: { blogs: savedBlog._id } },
    { new: true }
  )

  response.status(201).json(savedBlog.toJSON())
})


blogsRouter.delete('/:id', async (request, response) => {
  const token = request.token
  const decodedToken = jwt.verify(token, config.SECRET)
  const user = request.user
  if (!token || !decodedToken.id) {
    return response.status(401).end()
  }

  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).end()
  }

  if (!blog.user || !user || !user.id || blog.user.toString() !== user.id.toString()) {
    return response.status(401).end()
  }

  await Blog.findByIdAndRemove(request.params.id)

  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes },
    { new: true }
  )

  if (updatedBlog === null) {
    return response.status(404).end()
  }

  response.json(updatedBlog.toJSON())
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const { comment } = request.body

  const newComment = { content: comment }

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { $push: { comments: newComment } },
    { new: true }
  )

  if (updatedBlog === null) {
    return response.status(404).end()
  }

  response.json(updatedBlog.toJSON())
})



module.exports = blogsRouter
