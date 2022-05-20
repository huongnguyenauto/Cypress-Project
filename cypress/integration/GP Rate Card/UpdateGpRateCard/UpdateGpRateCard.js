/// <reference types = 'cypress'/>

describe('Update GP rate card', ()=> {
    let project_id = 'lotus_merchant_b2c'
    let URL_CREATE_RATE_CARD = 'https://alpha-gateway.weomni-test.com/oms/api/projects/' + project_id + '/rate-cards'
    let URL_UPDATE_RATE_CARD = 'https://alpha-gateway.weomni-test.com/oms/api/projects/' + project_id + '/rate-cards'

    before( ()=>{
        cy.getTokenToAccessMb2c()
    })

    it('Update gp rate card ', ()=>{
        let id_rate_card
        let bodyCreate = {
            'name': 'Shipping Fee', 
            'group': 'shipping-fee',
            'enabled': true,
            'rates': [{
               'start': 1,
               'end': 1.999999999999,
               'value': 10.0,
               'unit': 'BAHT',
               'type': 'FIX_RATE'
            }]
         }

         cy.request({
             method: 'POST',
             url: URL_CREATE_RATE_CARD,
             header: {
                'Authorization': 'Bearer ' + Cypress.env('tokenvalue'),
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept': '*/*',
                'Content-Type': 'application/json'
             },
             body: bodyCreate
         }).then(response =>{
             let bodyResponseID = JSON.parse(JSON.stringify(response.body))
             expect(response.status).to.eq(200)
             id_rate_card = bodyResponseID.id
             cy.wrap(bodyResponseID.id).as('id')
            cy.get('@id').then($check =>{
                id_rate_card = $check  
            })
             
         })
         
         let bodyUpdate = {
             'id': `${id_rate_card}`,
            'name': 'Shipping Fee', 
            'group': 'shipping-fee',
            'enabled': true,
            'rates': [{
               'start': 2,
               'end': 2.9,
               'value': 10.0,
               'unit': 'BAHT',
               'type': 'FIX_RATE'
            }]
         }

         cy.request({
             method: 'PUT',
             url: URL_UPDATE_RATE_CARD,
             header: {
                'Authorization': 'Bearer ' + Cypress.env('tokenvalue'),
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept': '*/*',
                'Content-Type': 'application/json'
             },
             body: bodyUpdate
         }).then(response =>{
             let bodyResponse = JSON.parse(JSON.stringify(response.body))
             expect(response.status).to.eq(200)
             cy.log(bodyResponse.id)
         })
    })
})