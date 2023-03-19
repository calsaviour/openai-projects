describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('/')
    cy.get('main').should('contain', 'Welcome to Aggregator Bot')
  })
})