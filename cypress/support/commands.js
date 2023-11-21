

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){

        cy.get('#firstName').type('Alexandre')
        cy.get('#lastName').type('Cabral')
        cy.get('#email').type('Teste@teste.com')
        cy.get('#product').select('Cursos')
        cy.get('input[type="radio"][value="feedback"]').check()
        cy.get('#email-checkbox').click()
        cy.get('#open-text-area').type('teste teste teste')                      
        cy.contains('button', 'Enviar').click()
        cy.get('.success > strong').should('contain', 'sucesso' )
})