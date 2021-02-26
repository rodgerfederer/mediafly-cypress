export function ifElementExists(element: string){
    return new Cypress.Promise((resolve: () => void) => {
        cy.get('body').then(($body : JQuery) => {
            if ($body.find(element).length > 0)
                resolve()
        })
    })
}