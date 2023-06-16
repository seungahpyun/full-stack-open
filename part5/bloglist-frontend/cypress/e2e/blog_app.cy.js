describe('Blog app', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
  })

  it ('Login form is shown', function() {
    cy.contains('login')
  })

  describe('Login', function() {
    it ('succeeds with correct credentials', function() {
      cy.get('#username').type('test')
      cy.wait(500)
      cy.get('#password').type('test')
      cy.wait(500)
      cy.get('#login-button').click()
      cy.wait(1000)

      cy.contains('hello, test 👋')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('test')
      cy.wait(500)
      cy.get('#password').type('wrong')
      cy.wait(500)
      cy.get('#login-button').click()
      cy.wait(1000)
      cy.get('#notification-error')
        .should('contain', 'Error : invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    it ('A blog can be created', function() {
      cy.get('#username').type('test')
      cy.wait(500)
      cy.get('#password').type('test')
      cy.wait(500)
      cy.get('#login-button').click()
      cy.wait(1000)

      cy.contains('Create New Blog').click()
      cy.get('#title').type('test title')
      cy.get('#author').type('test author')
      cy.get('#url').type('test url')
      cy.get('#create-blog-button').click()
      cy.wait(1000)

      cy.contains('test title - test author')
    })

    it('A blog can be liked', function() {
      cy.get('#username').type('test')
      cy.wait(500)
      cy.get('#password').type('test')
      cy.wait(500)
      cy.get('#login-button').click()
      cy.wait(1000)

      cy.contains('view').click()
      cy.get('#like-button').click()
      cy.wait(1000)

      cy.contains('likes 13')
    })

    it('A blog can be deleted', function() {
      cy.get('#username').type('test')
      cy.wait(500)
      cy.get('#password').type('test')
      cy.wait(500)
      cy.get('#login-button').click()
      cy.wait(1000)

      cy.get('#title-author').contains('test title - test author')
      cy.contains('view').click()
      cy.get('#delete-button').click()
      cy.wait(1000)

      cy.get('html').should('not.contain', 'test title - test author')
    })
  })
})
