import 'cypress-file-upload';
import {TestSite} from "../consts";

Cypress.Commands.add('uploadFile', () => {
    describe('Choose file', function () {
        before(function () {
            cy.visit(TestSite)
        })

        it('should upload image', () => {
            const filepath = 'images/white-cat.png'
            cy.get('input[type="file"]').attachFile(filepath)
            cy.get('[data-cy="upload"]').click()
            cy.get('#uploaded-files').contains('white-cat.png')
        })
    })
})

