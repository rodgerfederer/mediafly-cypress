import {TestSite8080, TestSite9090} from "../support/consts"

describe('API requests', () => {
    before('goto image processor page', () => {
        cy.writeFile("images.json", {images: []})
    })

    it('PUT image to the API service ', () => {
        cy.request({
            method: 'PUT',
            url: `${TestSite8080}/images/black-cat.png`,
            headers: {'Content-Type': 'application/json'}
        }).then((response : Cypress.Response) => {
            let test = JSON.parse(response.body)
            expect(response.status).to.equal(200)
            expect(test).to.have.property("result").and.to.equal("ok")
        })
    })

    it('verify id, status code and original information about image uploaded ', () => {
        cy.request({
            method: 'GET',
            url: `${TestSite8080}/images/black-cat.png`,
        }).then((response : Cypress.Response) => {
            let test = JSON.parse(response.body)
            expect(response.status).to.equal(200)
            expect(test).property("id").and.to.equal("black-cat.png")
        })
    })

    it('verify response of an image that was not found', () => {
        cy.request({
            method: 'GET',
            url: `${TestSite8080}/images/not-found.png`,
        }).then((response : Cypress.Response) => {
            let test = JSON.parse(response.body)
            expect(response.status).to.equal(200)
            expect(test).to.have.property("result").and.to.equal("ok")
            expect(test).to.have.property("reason").and.to.equal("Image not found")
        })
    })

    it('verify information about pending image', () => {
        cy.request({
            method: 'GET',
            url: `${TestSite8080}/images`
        }).then((response : Cypress.Response) => {
            let test = JSON.parse(response.body)
            expect(response.status).to.equal(200)
            expect(test[0]).to.have.property("id").and.to.equal("black-cat.png")
            expect(test[0]).to.have.property("status").and.to.equal("pending")
            expect(test[0]).to.have.property("original").and.to.equal("/black-cat.png")
        })
    })

    it('verify information pushed to the queue', () => {
        cy.request({
            method: 'POST',
            url: `${TestSite9090}/queues/mytest/push`,
            headers: {'Content-Type': 'application/json'},
            body: {"id": "IMAGENAME"}
        }).then((response: Cypress.Response) => {
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property("result").and.to.equal("ok")
        })
    })

    it('verify successful pop', () => {
        cy.request({
            method: 'POST',
            url: `${TestSite9090}/queues/mytest/pop`,
        }).then((response: Cypress.Response) => {
            expect(response.status).to.equal(200)
            expect(response.body).to.equal("IMAGENAME")
        })
    })

    it('verify failed pop', () => {
        cy.request({
            method: 'POST',
            url: `${TestSite9090}/queues/NotFound/pop`,
            failOnStatusCode: false
        }).then((response: Cypress.Response) => {
            let test = JSON.parse(response.body)
            expect(response.status).to.equal(500)
            expect(test).to.have.property("result").and.to.equal("bad")
            expect(test).to.have.property("reason").and.to.equal("Nothing on the queue to pop")
        })
    })
})