describe('Navigation Test', () => {
  it('loads page', () => {
    cy.visit('/')
    cy.title().should('eq', 'Ithil Interface')
  })

  it('loads trade page', () => {
    cy.contains('Trade').click()
    cy.location('pathname').should('eq', '/trade')
  })

  it('loads stake page', () => {
    cy.contains('Stake').click()
    cy.location('pathname').should('eq', '/stake')
  })

  it('loads dashboard page', () => {
    cy.contains('Dashboard').click()
    cy.location('pathname').should('eq', '/dashboard')
  })

  it('loads margin trading page', () => {
    cy.visit('/trade')
    cy.contains('Margin trading').click()
    cy.url().should('include', '/trade/margin-trading')
  })

  it('loads menu', () => {
    cy.visit('/')
    cy.title().should('eq', 'Ithil Interface')

    cy.get('#menu').click()
    cy.contains('About')
    cy.contains('Docs')
    cy.contains('Source')
    cy.contains('Discord')
  })
})
