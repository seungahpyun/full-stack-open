const config = require('../utils/config')
const Blog = require('../models/blog')
const express = require('express')
const router = express.Router()

router.get('/', async(request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

router.post('/', async(request, response) => {
  const blog = new Blog(request.body)
  const savedBlog = await blog.save()

  if (!request.body.title && !request.body.url) {
    response.status(400).end()
  }
  if (!request.body.likes) {
    savedBlog.likes = 0
  }

  response.status(201).json(savedBlog)
})

router.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

router.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body
  const blog = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes }
  )

  if (blog === null) return response.status(404).end()
  response.json(blog)
})

module.exports = router
