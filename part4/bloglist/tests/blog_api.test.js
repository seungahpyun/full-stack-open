const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./blog_api_test_helper')


beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

// test('unique identifier property of the blog posts is named id', async () => {
//   const response = await api.get('/api/blogs')
//   const ids = response.body.map(r=> r.id)
//   for (let id of ids) {
//     expect(id).toBeDefined()
//   }
// })

afterAll(async () => {
  await mongoose.connection.close()
})
