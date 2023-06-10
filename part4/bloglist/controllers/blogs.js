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
  response.status(201).json(savedBlog)
})

router.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})


module.exports = router
