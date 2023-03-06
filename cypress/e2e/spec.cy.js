describe('Blog app', function () {
  beforeEach(function () {
    cy.resetBlog()
    cy.addUser({ name: 'Nuevo', username: 'Anadido', password: 'nuevo' })
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

  describe('when loged in', function () {
    beforeEach(function () {
      cy.login({ username: 'Anadido', password: 'nuevo' })
      cy.createBlog({ title: 'creando en before', author: 'autor del before', url: 'una_tipica_url' })
      cy.addUser({ name: 'NO borra', username: 'Inborrar', password: 'borrar' })

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
    it('like a blog', function () {
      cy.contains('view').click()
      cy.get('#like-button').click()
      cy.contains('creando en before autor del before').parent().should('contain', '1')
    })
    it('delete a blog the user who created it', function () {
      cy.contains('view').click()
      cy.get('#like-button').click()
      cy.contains('creando en before autor del before').parent().get('#remove-button').click()
      cy.get('html').should('not.contain', 'creando en before autor del before')
    })
  })
  it.only('user cannot delete other user blog', function () {
    cy.login({ username: 'Anadido', password: 'nuevo' })
    cy.createBlog({ title: 'creando en before', author: 'autor del before', url: 'una_tipica_url' })
    cy.get('#remove-button').should('exist')
    cy.get('#logout-button').click()
    cy.addUser({ name: 'NO borra', username: 'Inborrar', password: 'borrar' })
    cy.login({ username: 'Inborrar', password: 'borrar' })
    cy.wait(100)
    cy.get('#remove-button').should('not.exist')
  })
})
