describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Nuevo',
      username: 'Anadido',
      password: 'nuevo'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })
  describe('Login', function () {
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
    it('login fails with wrong password', function () {
      cy.contains('login').click()
      cy.get('#username').type('hola')
      cy.get('#password').type('buendia')
      cy.get('#login-button').click()
      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
      cy.get('html').should('not.contain', 'Nuevo logged in')
      cy.contains('Nuevo Luukkainen logged in').should('not.exist') //Otra forma de la linea anterior
    })
  })

  describe.only('when loged in', function () {
    beforeEach(function () {
      cy.login({ username: 'Anadido', password: 'nuevo' })
      cy.createBlog({title: 'creando en before', author: 'autor del before' , url: 'una_tipica_url'})
    }) //De esta forma, te salta el login Form y directamente entras
    /*beforeEach(function () {
      cy.contains('login').click()
      cy.get('#username').type('hola')
      cy.get('#password').type('buendia')
      cy.get('#login-button').click()
    })*/ //Asi es escribiendo en el login form y entrando
    it('a new blog entrance is created', function () {
      cy.contains('create new blog').click()
      cy.get('#Title').type('titulo')
      cy.get('#Author').type('autor')
      cy.get('#URL').type('url')
      cy.get('#create-button').click()
      cy.get('.success')
      .should('contain', `New Blog titulo by autor added correctly`)
      cy.contains('titulo')
      cy.contains('autor')
      cy.contains('view')
    })
  })
})
