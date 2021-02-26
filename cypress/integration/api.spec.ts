
    describe('API requests', () => {

        it('PUT image to the API service ', () => {
            cy.request({method: 'PUT', url: 'http://127.0.0.1:8080/images/black-cat.png', headers: {'Content-Type': 'application/json'}}).then((response : Cypress.Response) => {
                let test = JSON.parse(response.body)
                cy.log(test)
                expect(response.status).to.equal(200)
                expect(test).to.have.property("result").and.to.equal("ok")
            })
        })

        it('verify id, status code and original information about image uploaded ', () => {
            cy.request({method: 'GET', url: 'http://127.0.0.1:8080/images/white-cat.png', headers: {'Content-Type': 'application/json'}}).then((response : Cypress.Response) => {
                let test = JSON.parse(response.body)
                cy.log(test)
                expect(response.status).to.equal(200)
                expect(test).to.have.property("id")
                expect(test).property("id").to.equal("white-cat.png")
            })
        })

        it('verify information about all images in ', () => {
            cy.request({method: 'GET', url: 'http://127.0.0.1:8080/images', headers: {'Content-Type': 'application/json'}}).then((response : Cypress.Response) => {
                let test = JSON.parse(response.body)
                cy.log(test)
                expect(response.status).to.equal(200)
                expect(test[0]).to.have.property("id").and.to.equal("white-cat.png")
                expect(test[0]).to.have.property("status").and.to.equal("completed")
                expect(test[0]).to.have.property("original").and.to.equal("/white-cat.png")
                    expect(test[1]).to.have.property("id").and.to.equal("black-cat.png")
                    expect(test[1]).to.have.property("status").and.to.equal("completed")
                    expect(test[1]).to.have.property("original").and.to.equal("/black-cat.png")
            })
        })

        it('verify information pushed to the queue', () => {
            cy.request({
                method: 'POST',
                url: 'http://127.0.0.1:9090/queues/mytest/push',
                headers: {'Content-Type': 'application/json'},
                body: {"id": "IMAGENAME"}
            })
                .then((response: Cypress.Response) => {
                    cy.log(response.body)
                    expect(response.status).to.equal(200)
                    expect(response.body).to.have.property("result").and.to.equal("ok")
                })
        })

        it('verify pop', () => {
            cy.request({
                method: 'POST',
                url: 'http://127.0.0.1:9090/queues/mytest/pop'
            })
                .then((response: Cypress.Response) => {
                    cy.log(response.body)
                    expect(response.status).to.equal(200)
                    expect(response.body).contains("IMAGENAME")
                })
        })

    })