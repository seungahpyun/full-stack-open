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

      cy.contains('Error : invalid username or password')
    })
  })
})
