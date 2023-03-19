describe('The ChatGPT Page', () => {
    it('successfully loads', () => {
      cy.visit('/chatgpt');
      cy.get('input')
        .should('have.attr', 'placeholder')
      cy.get('input')
        .should('be.visible');
      cy.get('main')
        .should('contain', 'I am at your service')
    })
  })