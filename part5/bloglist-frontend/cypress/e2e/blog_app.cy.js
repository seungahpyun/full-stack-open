/* eslint-disable jest/expect-expect */
describe('Blog app', function() {
  const user = {
    name: 'test',
    username: 'test',
    password: 'test'
  }

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('#login-button').click()
      cy.contains(`hello, ${user.name} 👋`)
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type(user.username)
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.get('#notification-error')
        .should('contain', 'Error : invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('#login-button').click()

      cy.contains('Create New Blog').click()
      cy.get('#title').type('test title')
      cy.get('#author').type('test author')
      cy.get('#url').type('test url')
      cy.get('#create-blog-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('test title - test author')
    })

    it('A blog can be liked', function() {
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('likes 1')
    })

    it('A blog can be deleted', function() {
      cy.contains('view').click()
      cy.contains('delete').click()
      cy.get('html').should('not.contain', 'test title - test author')
    })

    it('A blog cannot be deleted by another user', function() {
      cy.contains('logout').click()

      const anotherUser = {
        name: 'another',
        username: 'another',
        password: 'another'
      }

      cy.request('POST', 'http://localhost:3003/api/users/', anotherUser)
        .then(() => {
          cy.get('#username').type(anotherUser.username)
          cy.get('#password').type(anotherUser.password)
          cy.get('#login-button').click()

          cy.contains('test title - test author')
            .parent()
            .as('blog')

          cy.get('@blog').contains('view').click()
          cy.get('@blog').should('not.contain', 'delete-button')
        })
    })

    it('Blogs are sorted by number of likes', function() {
      cy.contains('Create New Blog').click()
      cy.get('#title').type('blog with 2 like')
      cy.get('#author').type('author')
      cy.get('#url').type('url')
      cy.get('#create-blog-button').click()

      cy.get('.blog-details').eq(1).find('#view-button').click()
      cy.get('#like-button').click()
      cy.get('#like-button').click()

      cy.get('.blog-details').eq(0).should('contain', 'blog with 2 like')
      cy.get('.blog-details').eq(1).should('contain', 'test')
    })
  })
})
