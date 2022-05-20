/// <reference types = "cypress"/>


let url_weshop = 'https://alpha-gateway.weomni-test.com/weshop'

describe('Create GP period', () => {
    let url_weshop = 'https://alpha-gateway.weomni-test.com/weshop'
    let brandID = '626a533cbb40210001a03bec'

    before(() => {
        cy.getTokenToAccessMb2c()
    })

    it('TC01 create GP01 period with percent equal 20', () => {
        let gpBody = {
            "deleteFlag": true,
            "grossProfitPeriod": {
                "percent": 15.0,
                "effectiveDate": "2022-05-15T00:00:00.999Z",
                "expiredDate": "2022-06-20T00:00:00.999Z",
                "segments": [
                    {
                        "type": "GROSS_PROFIT",
                        "value": 15.0
                    }
                ]
            }
        }

        cy.request({
            method: 'POST',
            url: url_weshop + '/api/admin/brands/' + brandID + '/gross-profit-period',
            headers: {
                'Authorization': 'Bearer ' + Cypress.env('tokenvalue'),
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept': '*/*',
                'Content-Type': 'application/json'
            },
            body: gpBody
        }).then(response => {
            expect(response.status).to.eq(200)
            let resBody = JSON.parse(JSON.stringify(response.body))
            cy.log(resBody.id)
        })
    })

    it('TC02 create GP02 period with time duplicate with GP01', ()=>{
        let gpBody = {
            "deleteFlag": false,
            "grossProfitPeriod": {
                "percent": 15.0,
                "effectiveDate": "2022-05-15T00:00:00.999Z",
                "expiredDate": "2022-06-20T00:00:00.999Z",
                "segments": [
                    {
                        "type": "GROSS_PROFIT",
                        "value": 15.0
                    }
                ]
            }
        }

        cy.request({
            method: 'POST',
            url: url_weshop + '/api/admin/brands/' + brandID + '/gross-profit-period',
            headers: {
                'Authorization': 'Bearer ' + Cypress.env('tokenvalue'),
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept': '*/*',
                'Content-Type': 'application/json'
            },
            body: gpBody,
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(400)
            // let resBody = JSON.parse(JSON.stringify(response.body))
            // cy.log(response.status)
        })
    })

})

