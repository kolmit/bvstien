describe('Mon application Angular', () => {
  it("devrait afficher la page d'accueil", () => {
    cy.visit('/');
    cy.title().should('eq', 'FitnessPerfs');
    cy.get('.login-container button').click();
  });
});
