describe('Blog app', () => {
  beforeEach(function () {
    cy.visit('http://localhost:3000')
  })
  it('front page can be opened', function () {
    cy.contains('username')
    cy.contains('password')
  })
  it('login form can be opened', function () {
    cy.contains('login').click()
    cy.get('#username').type('hola')
    cy.get('#password').type('buendia')
    cy.get('#login-button').click()
  })
  describe('when loged in', function () {
    beforeEach(function () {
      cy.contains('login').click()
      cy.get('#username').type('hola')
      cy.get('#password').type('buendia')
      cy.get('#login-button').click()
    })
    it('a new blog entrance is created', function(){
      cy.contains('create new blog').click()
      cy.get('#Title').type('titulo')
      cy.get('#Author').type('autor')
      cy.get('#URL').type('url')

    })
  })
})