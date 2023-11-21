

/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {

    beforeEach(() => {
        cy.visit('./src/index.html');
    });

    it('verifica o título da aplicação', function() {
        
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
        cy.get('#title').should('have.text', 'CAC TAT')
    })
    it('Preenche os campos  e envia formulario',function ()  {

        const longText = 'Muito ruim esse programa aqui!Muito ruim esse programa aqui!Muito ruim esse programa aqui!Muito ruim esse programa aqui!Muito ruim esse programa aqui!Muito ruim esse programa aqui!'        
       
        cy.get('#firstName').type('Alexandre')
        cy.get('#lastName').type('Cabral')
        cy.get('#email').type('Teste@teste.com')
        cy.get('#product').select('Cursos')
        cy.get('#support-type > :nth-child(3)').click()
        cy.get('#email-checkbox').click()
        cy.get('#open-text-area').type(longText, {delay:0})                      
        cy.contains('button', 'Enviar').click()
        cy.get('.success > strong').should('have.text', 'Mensagem enviada com sucesso.' )
        
    });

    it('Validar mensagem de email errado', () => {

        const longText = 'Muito ruim esse programa aqui!Muito ruim esse programa aqui!Muito ruim esse programa aqui!Muito ruim esse programa aqui!Muito ruim esse programa aqui!Muito ruim esse programa aqui!'

        cy.get('.error > strong').should('not.be.visible')        
        cy.get('#firstName').type('Alexandre')
        cy.get('#lastName').type('Cabral')
        cy.get('#email').type('Teste123')
        cy.get('#product').select('Cursos').should('have.value', 'cursos')
        cy.get('#support-type > :nth-child(3)').click()
        cy.get('#email-checkbox').click()
        cy.get('#open-text-area').type(longText, {delay:0})                      
        cy.contains('button', 'Enviar').click()
        cy.get('.error > strong').should('be.visible')
        cy.get('.error > strong').should('have.text', 'Valide os campos obrigatórios!' )
        
    });

    it('Validar que campo numero de telefone aceita apenas numero ', () => {

        cy.get('#phone').type('sasd+-*d-**-')
            .should('have.value', '')        
    });

    it('Validar exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('.error > strong').should('not.be.visible')       
        cy.get('#firstName').type('Alexandre')
        cy.get('#lastName').type('Cabral')
        cy.get('#email').type('Teste@teste.com')
        cy.get('#product').select('Cursos')
        cy.get('#support-type > :nth-child(3)').click()
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('teste texto')                      
        cy.contains('button', 'Enviar').click()
        cy.get('.error > strong').should('be.visible')
        cy.get('.error > strong').should('have.text', 'Valide os campos obrigatórios!' )
    });
    it('Validar preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        
        cy.get('#firstName').type('Alexandre').should('have.value','Alexandre').clear().should('have.value','')
        cy.get('#lastName').type('Cabral').should('have.value','Cabral').clear().should('have.value','')
        cy.get('#email').type('Teste@teste.com').should('have.value','Teste@teste.com').clear().should('have.value','')
        cy.get('#phone').type('819988611718').should('have.value','819988611718').clear().should('have.value','')
    });
    
    it('Validar exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {

        cy.get('#email-checkbox').click()
        cy.get('#phone-checkbox').click()
        cy.contains('button', 'Enviar').click()
        cy.get('.error > strong').should('have.text', 'Valide os campos obrigatórios!' )
        
    });

    it('Validar envia o formuário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit()
        
    });

    it('Validar seleciona um produto (Blog) por seu índice', () => {
        cy.get('#product')
            .select(1)
                .should('have.value','blog')
        
    });
    
    it('Marcar botão radio', () => {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
               .should('have.value', 'feedback')
               .should('be.checked')
    });

    it('Marcar botão radio e desmarcar', () => {

        cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')


        // cy.get('#email-checkbox')
        //     .check()
        //            .should('be.checked')

        // cy.get('#phone-checkbox')
        //        .check()                  
        //           .should('be.checked')

                
        // cy.get('#email-checkbox')
        //           .uncheck()
        //                  .should('not.be.checked')
      
        // cy.get('#phone-checkbox')
        //              .uncheck()                  
        //                 .should('not.be.checked')

    });

    it('Validar selecionar um arquivo da pasta fixtures', function() {

        cy.get('#file-upload')
                .should('not.have.value')
                .selectFile('cypress/fixtures/Cartão de Embarque _ LATAM SP-FLN.pdf')
                .should(function($input){
                    expect($input[0].files[0].name).to.equal('Cartão de Embarque _ LATAM SP-FLN.pdf')
                })

                
        
    });

     it('Validar seleciona um arquivo simulando um drag-and-drop', function() {

        cy.get('#file-upload')
                .should('not.have.value')
                .selectFile('cypress/fixtures/Cartão de Embarque _ LATAM SP-FLN.pdf', {action: 'drag-drop'})
                .should(function($input){
                    expect($input[0].files[0].name).to.equal('Cartão de Embarque _ LATAM SP-FLN.pdf')
                })               
        
    });

    it('Validar seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function()  {

        cy.fixture('Cartão de Embarque _ LATAM SP-FLN.pdf').as('samplefile')

        cy.get('#file-upload')
            .selectFile('@samplefile')
            .should(function($input){
                    expect($input[0].files[0].name).to.equal('Cartão de Embarque _ LATAM SP-FLN.pdf')
                })    
        
    });

    it('Validar verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
        
        cy.get('#privacy a').should('have.attr','target','_blank')
        
    });

    it('Validar acessa a página da política de privacidade removendo o target e então clicando no link', () => {
        
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
        cy.contains('Talking About Testing')
            .should('be.visible')


        
    });

  })
  