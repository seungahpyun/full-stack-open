const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('../utils/blog_api_test_helper')



beforeEach(async () => {
  await Blog.deleteMany({})

  for (let note of helper.initialBlogs) {
    let blogObject = new Blog(note)
    await blogObject.save()
  }
})


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})


test('unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs')
  const ids = response.body.map(r=> r.id)
  for (let id of ids) {
    expect(id).toBeDefined()
  }
})

describe('addition of a new blog', () => {
  test('a valid blog can be added', async () => {
    await api
      .post('/api/blogs')
      .send({
        author: 'Test Author',
        title: 'Test Blog',
        url: 'http://testblog.com'
      })
      .expect(201)
      .expect('Content-Type', /application\/json/)
      const finalBlogs = await helper.blogsInDb()
      expect(finalBlogs).toHaveLength(helper.initialBlogs.length + 1)
      const titles = finalBlogs.map(r => r.title)
      expect(titles).toContain('Test Blog')
  })
})




afterAll(async () => {
  await mongoose.connection.close()
})
