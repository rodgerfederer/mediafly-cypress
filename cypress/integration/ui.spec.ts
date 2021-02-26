import {TestSite} from "../support/consts";
import '../support/index'
import 'cypress-file-upload';

context('The Image Processor Page', () => {

    describe('Image Processor Page' , () => {

        before('goto image processor page', () => {
            cy.visit(TestSite)
        })

        it('has the correct header', () => {
            cy.get("h2").should("have.text", " Image Processor ")
        })

        it('has the correct text for image upload', () => {
            cy.get('h3').eq(0).should("have.text", " Upload Image ")
        })

        it('has the Choose File button', () => {
            cy.get('[data-cy="choose"]').should("be.visible")
        })

        it('has the Upload Image button', () => {
            cy.get('[data-cy="upload"]').should("have.value", "Upload Image")
        })

        it('has the correct text for Previously Uploaded Images', () => {
            cy.get('h3').eq(1).should("have.text", " Previously Uploaded Images ")
        })

        it('has the Previously Uploaded Images table with all the columns', () => {
            cy.get('table').contains('th', ' ID ').should('be.visible')
                .get('table').contains('th', ' Status ').should('be.visible')
                .get('table').contains('th', ' Original Image ').should('be.visible')
                .get('table').contains('th', ' Processed Image ').should('be.visible')
        })
    })

    describe('Choosing file to upload', () => {

        before('goto image processor page', () => {
            cy.visit(TestSite)
        })

        it('validate picture uploaded and has completed status', () => {
            cy.get('[data-cy="choose"]').attachFile('images/white-cat.png')
            cy.get('[data-cy="upload"]').click()
            cy.contains('white-cat').siblings().eq(0).should('contain', 'pending')
            cy.wait(1000)
            cy.reload()
            cy.contains('white-cat').siblings().eq(0).should('contain', 'completed')
            cy.contains('white-cat').siblings().eq(2).should('contain', 'Processed')
        })

        it('validate picture uploaded and has pending status', () => {
            cy.get('[data-cy="choose"]').attachFile('images/black-cat.png')
            cy.get('[data-cy="upload"]').click()
            cy.contains('black-cat').siblings().eq(0).should('contain', 'pending')
        })

    })

})