/// <reference types = 'cypress'/>



describe('Create GP Rate Card', ()=>{
    let project_id = 'lotus_merchant_b2c'
    let domain_Mb2c = 'https://alpha-gateway.weomni-test.com'
    let url_Mb2C = '/oms/api/projects/' + project_id + '/rate-cards'
    let id_rate_card = null;

    before(() =>{
        cy.getTokenToAccessMb2c()
    })

    it('Status 200 Create GP rate card with rate distance have start,end is null', ()=>{
        let bodyCreateRateCard = {
            'name': 'Shipping Fee', 
            'group': 'shipping-fee',
            'enabled': true,
            'rates': [{
               'start': null,
               'end': null,
               'value': 10.0,
               'unit': 'BAHT',
               'type': 'FIX_RATE'
            }]
         }

         cy.request({
             method: 'POST',
             url: domain_Mb2c + url_Mb2C,
             header: {
                'Authorization': 'Bearer ' + Cypress.env('tokenvalue'),
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept': '*/*',
                'Content-Type': 'application/json'
             },
             body: bodyCreateRateCard,
         }).then(response =>{
             let bodyResponse = JSON.parse(JSON.stringify(response.body))
             expect(response.status).to.eq(200)
             expect(bodyResponse.name).to.eq(bodyCreateRateCard.name)
             cy.log(bodyResponse.rates[0].id)
            //  expect(bodyResponse.rates[0].start)  
         })
    })

    it('Status 200 Create GP rate with value of rate have 10.9999999', ()=>{
        let bodyCreateRate = {
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
             url: domain_Mb2c + url_Mb2C,
             header: {
                'Authorization': 'Bearer ' + Cypress.env('tokenvalue'),
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept': '*/*',
                'Content-Type': 'application/json'
             },
             body: bodyCreateRate
         }).then(response =>{
             let bodyResponse = JSON.parse(JSON.stringify(response.body))
             expect(response.status).to.eq(200)
             cy.log(bodyResponse.rates[0].id)
         })
    })

    it('Status 200 Create rate card with rate from 1->1.99 and rate 2 have end is null', ()=>{
        let bodyCreateRateCardHaveRate2IsNull = {
            'name': 'Shipping Fee', 
            'group': 'shipping-fee',
            'enabled': true,
            'rates': [{
               'start': 0,
               'end': 0.99,
               'value': 10.0,
               'unit': 'BAHT',
               'type': 'FIX_RATE'
            },{
               'start': 1,
               'end': null,
               'value': 15.0,
               'unit': 'BAHT',
               'type': 'FIX_RATE'
            }]
         }

         cy.request({
             method: 'POST',
             url: domain_Mb2c + url_Mb2C,
             header: {
                'Authorization': 'Bearer ' + Cypress.env('tokenvalue'),
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept': '*/*',
                'Content-Type': 'application/json'
             },
             body: bodyCreateRateCardHaveRate2IsNull
         }).then(response =>{
             let bodyResponse = JSON.parse(JSON.stringify(response.body))
             expect(response.status).to.eq(200)
             cy.log(bodyResponse.id)
         })
    })

    it('Status 200 Create rate card have enable is null', ()=>{
        let bodyCreateHaveEnableNull = {
            'name': 'Shipping Fee', 
            'group': 'shipping-fee',
            'enabled': null,
            'rates': [{
               'start': 1,
               'end': 1.99,
               'value': 10.0,
               'unit': 'BAHT',
               'type': 'FIX_RATE'
            },{
               'start': 2,
               'end': 2.99,
               'value': 15.0,
               'unit': 'BAHT',
               'type': 'FIX_RATE'
            },{
               'start': 3,
               'end': 3.99,
               'value': 17.0,
               'unit': 'BAHT',
               'type': 'FIX_RATE'
            },{
               'start': 4,
               'end': 4.99,
               'value': 22.0,
               'unit': 'BAHT',
               'type': 'FIX_RATE'
            },{
               'start': 5,
               'end': 5.99,
               'value': 27.0,
               'unit': 'BAHT',
               'type': 'FIX_RATE'
            },{
               'start': 6,
               'end': 6.99,
               'value': 32.0,
               'unit': 'BAHT',
               'type': 'FIX_RATE'
            }]
         }
        
         cy.request({
             method: 'POST',
             url: domain_Mb2c + url_Mb2C,
             header: {
                'Authorization': 'Bearer ' + Cypress.env('tokenvalue'),
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept': '*/*',
                'Content-Type': 'application/json'
             },
             body: bodyCreateHaveEnableNull,
         }).then(response =>{
             let bodyResponse = JSON.parse(JSON.stringify(response.body))
             expect(response.status).to.eq(200)
             expect(bodyResponse.enabled).eql(true)
         })
    })

    it('Status 200 Create rate card have name is number', ()=>{
      let bodyCreateHaveNameIsNumber = {
          'name': 123, 
          'group': 'shipping-fee',
          'enabled': true,
          'rates': [{
             'start': 1,
             'end': 1.99,
             'value': 10.0,
             'unit': 'BAHT',
             'type': 'FIX_RATE'
          },{
             'start': 2,
             'end': 2.99,
             'value': 15.0,
             'unit': 'BAHT',
             'type': 'FIX_RATE'
          },{
             'start': 3,
             'end': 3.99,
             'value': 17.0,
             'unit': 'BAHT',
             'type': 'FIX_RATE'
          },{
             'start': 4,
             'end': 4.99,
             'value': 22.0,
             'unit': 'BAHT',
             'type': 'FIX_RATE'
          },{
             'start': 5,
             'end': 5.99,
             'value': 27.0,
             'unit': 'BAHT',
             'type': 'FIX_RATE'
          },{
             'start': 6,
             'end': 6.99,
             'value': 32.0,
             'unit': 'BAHT',
             'type': 'FIX_RATE'
          }]
       }
      
       cy.request({
           method: 'POST',
           url: domain_Mb2c + url_Mb2C,
           header: {
              'Authorization': 'Bearer ' + Cypress.env('tokenvalue'),
              'Accept-Encoding': 'gzip, deflate, br',
              'Accept': '*/*',
              'Content-Type': 'application/json'
           },
           body: bodyCreateHaveNameIsNumber,
       }).then(response =>{
           let bodyResponse = JSON.parse(JSON.stringify(response.body))
           expect(response.status).to.eq(200)
           cy.log(bodyResponse.name)
           expect(bodyResponse.name).eql("123")
       })
   })

   it('Status 200 Create rate card have multiple rate', ()=>{
      let bodyCreateHaveNameIsNumber = {
          'name': "rate card", 
          'group': 'shipping-fee',
          'enabled': true,
          'rates': [{
             'start': 1,
             'end': 1.99,
             'value': 10.0,
             'unit': 'BAHT',
             'type': 'FIX_RATE'
          },{
             'start': 2,
             'end': 2.99,
             'value': 15.0,
             'unit': 'BAHT',
             'type': 'FIX_RATE'
          },{
             'start': 3,
             'end': 3.99,
             'value': 17.0,
             'unit': 'BAHT',
             'type': 'FIX_RATE'
          },{
             'start': 4,
             'end': 4.99,
             'value': 22.0,
             'unit': 'BAHT',
             'type': 'FIX_RATE'
          },{
             'start': 5,
             'end': 5.99,
             'value': 27.0,
             'unit': 'BAHT',
             'type': 'FIX_RATE'
          },{
             'start': 6,
             'end': 6.99,
             'value': 32.0,
             'unit': 'BAHT',
             'type': 'FIX_RATE'
          }]
       }
      
       cy.request({
           method: 'POST',
           url: domain_Mb2c + url_Mb2C,
           header: {
              'Authorization': 'Bearer ' + Cypress.env('tokenvalue'),
              'Accept-Encoding': 'gzip, deflate, br',
              'Accept': '*/*',
              'Content-Type': 'application/json'
           },
           body: bodyCreateHaveNameIsNumber,
       }).then(response =>{
           let bodyResponse = JSON.parse(JSON.stringify(response.body))
           expect(response.status).to.eq(200)
           expect(bodyResponse.name).eql("rate card")
           id_rate_card = bodyResponse.id
           cy.log(id_rate_card)
       })
   })

   it('Status 400 Create rate card with start is string', ()=>{
      let bodyCreateStartIsString = {
          'name': "rate card", 
          'group': 'shipping-fee',
          'enabled': true,
          'rates': [{
             'start': "abc",
             'end': 1.99,
             'value': 10.0,
             'unit': 'BAHT',
             'type': 'FIX_RATE'
          },{
             'start': 2,
             'end': 2.99,
             'value': 15.0,
             'unit': 'BAHT',
             'type': 'FIX_RATE'
          },{
             'start': 3,
             'end': 3.99,
             'value': 17.0,
             'unit': 'BAHT',
             'type': 'FIX_RATE'
          }]
       }
       cy.request({
         method: 'POST',
         url: domain_Mb2c + url_Mb2C,
         header: {
            'Authorization': 'Bearer ' + Cypress.env('tokenvalue'),
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept': '*/*',
            'Content-Type': 'application/json'
         },
         body: bodyCreateStartIsString,
         failOnStatusCode:false,      
       }).then(response =>{
         let bodyResponse = JSON.parse(JSON.stringify(response.body))
         expect(response.status).to.eq(400)
     })
   })

   it('Status 400 Create rate card with start is navigate', ()=>{
      let bodyCreateStartIsNavigate = {
          'name': "rate card", 
          'group': 'shipping-fee',
          'enabled': true,
          'rates': [{
             'start': -1,
             'end': 1.99,
             'value': 10.0,
             'unit': 'BAHT',
             'type': 'FIX_RATE'
          },{
             'start': 2,
             'end': 2.99,
             'value': 15.0,
             'unit': 'BAHT',
             'type': 'FIX_RATE'
          },{
             'start': 3,
             'end': 3.99,
             'value': 17.0,
             'unit': 'BAHT',
             'type': 'FIX_RATE'
          }]
       }
       cy.request({
         method: 'POST',
         url: domain_Mb2c + url_Mb2C,
         header: {
            'Authorization': 'Bearer ' + Cypress.env('tokenvalue'),
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept': '*/*',
            'Content-Type': 'application/json'
         },
         body: bodyCreateStartIsNavigate,
         failOnStatusCode:false,      
       }).then(response =>{
         let bodyResponse = JSON.parse(JSON.stringify(response.body))
         expect(response.status).to.eq(400)
     })
   })

   it('Status 400 Create rate card with start,end of last rate is null', ()=>{
      let bodyCreateStartIsNavigate = {
          'name': "rate card", 
          'group': 'shipping-fee',
          'enabled': true,
          'rates': [{
             'start': 1,
             'end': 1.99,
             'value': 10.0,
             'unit': 'BAHT',
             'type': 'FIX_RATE'
          },{
             'start': 2,
             'end': 2.99,
             'value': 15.0,
             'unit': 'BAHT',
             'type': 'FIX_RATE'
          },{
             'start': null,
             'end': null,
             'value': 17.0,
             'unit': 'BAHT',
             'type': 'FIX_RATE'
          }]
       }
       cy.request({
         method: 'POST',
         url: domain_Mb2c + url_Mb2C,
         header: {
            'Authorization': 'Bearer ' + Cypress.env('tokenvalue'),
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept': '*/*',
            'Content-Type': 'application/json'
         },
         body: bodyCreateStartIsNavigate,
         failOnStatusCode:false,      
       }).then(response =>{
         let bodyResponse = JSON.parse(JSON.stringify(response.body))
         expect(response.status).to.eq(400)
     })
   })

   it('Status 400 Create rate card with value is string', ()=>{
      let bodyCreateValueIsString = {
          'name': "rate card", 
          'group': 'shipping-fee',
          'enabled': true,
          'rates': [{
             'start': 1,
             'end': 1.99,
             'value': "abcd",
             'unit': 'BAHT',
             'type': 'FIX_RATE'
          },{
             'start': 2,
             'end': 2.99,
             'value': 15.0,
             'unit': 'BAHT',
             'type': 'FIX_RATE'
          },{
             'start': null,
             'end': null,
             'value': 17.0,
             'unit': 'BAHT',
             'type': 'FIX_RATE'
          }]
       }
       cy.request({
         method: 'POST',
         url: domain_Mb2c + url_Mb2C,
         header: {
            'Authorization': 'Bearer ' + Cypress.env('tokenvalue'),
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept': '*/*',
            'Content-Type': 'application/json'
         },
         body: bodyCreateValueIsString,
         failOnStatusCode:false,      
       }).then(response =>{
         let bodyResponse = JSON.parse(JSON.stringify(response.body))
         expect(response.status).to.eq(400)
     })
   })

   it('Status 400 Create rate card with value is negative', ()=>{
      let bodyCreateValueIsNegative = {
          'name': "rate card", 
          'group': 'shipping-fee',
          'enabled': true,
          'rates': [{
             'start': 1,
             'end': 1.99,
             'value': -1,
             'unit': 'BAHT',
             'type': 'FIX_RATE'
          },{
             'start': 2,
             'end': 2.99,
             'value': 15.0,
             'unit': 'BAHT',
             'type': 'FIX_RATE'
          }]
       }
       cy.request({
         method: 'POST',
         url: domain_Mb2c + url_Mb2C,
         header: {
            'Authorization': 'Bearer ' + Cypress.env('tokenvalue'),
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept': '*/*',
            'Content-Type': 'application/json'
         },
         body: bodyCreateValueIsNegative,
         failOnStatusCode:false,      
       }).then(response =>{
         let bodyResponse = JSON.parse(JSON.stringify(response.body))
         expect(response.status).to.eq(400)
     })
   })

   it('Status 400 Create rate card with value is null', ()=>{
      let bodyCreateValueIsNull= {
          'name': "rate card", 
          'group': 'shipping-fee',
          'enabled': true,
          'rates': [{
             'start': 1,
             'end': 1.99,
             'value': null,
             'unit': 'BAHT',
             'type': 'FIX_RATE'
          },{
             'start': 2,
             'end': 2.99,
             'value': 15.0,
             'unit': 'BAHT',
             'type': 'FIX_RATE'
          }]
       }
       cy.request({
         method: 'POST',
         url: domain_Mb2c + url_Mb2C,
         header: {
            'Authorization': 'Bearer ' + Cypress.env('tokenvalue'),
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept': '*/*',
            'Content-Type': 'application/json'
         },
         body: bodyCreateValueIsNull,
         failOnStatusCode:false,      
       }).then(response =>{
         let bodyResponse = JSON.parse(JSON.stringify(response.body))
         expect(response.status).to.eq(400)
     })
   })

   it('Status 400 Create rate card with type is null', ()=>{
      let bodyCreateTypeIsNull = {
          'name': "rate card", 
          'group': 'shipping-fee',
          'enabled': true,
          'rates': [{
             'start': 1,
             'end': 1.99,
             'value': 10.5,
             'unit': 'BAHT',
             'type': null,
          },{
             'start': 2,
             'end': 2.99,
             'value': 15.0,
             'unit': 'BAHT',
             'type': 'FIX_RATE'
          }]
       }
       cy.request({
         method: 'POST',
         url: domain_Mb2c + url_Mb2C,
         header: {
            'Authorization': 'Bearer ' + Cypress.env('tokenvalue'),
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept': '*/*',
            'Content-Type': 'application/json'
         },
         body: bodyCreateTypeIsNull,
         failOnStatusCode:false,      
       }).then(response =>{
         let bodyResponse = JSON.parse(JSON.stringify(response.body))
         expect(response.status).to.eq(400)
     })
   })

   it('Status 400 Create rate card with rate overlap', ()=>{
      let bodyCreateRateOverlap = {
          'name': "rate card", 
          'group': 'shipping-fee',
          'enabled': true,
          'rates': [{
             'start': 1,
             'end': 1.99,
             'value': 10.5,
             'unit': 'BAHT',
             'type': 'FIX_RATE',
          },{
             'start': 2,
             'end': 2.99,
             'value': 15.0,
             'unit': 'BAHT',
             'type': 'FIX_RATE'
          },{
            'start': 2.5,
            'end': 3.99,
             'value': 17.0,
             'unit': 'BAHT',
             'type': 'FIX_RATE'
          }]
       }
       cy.request({
         method: 'POST',
         url: domain_Mb2c + url_Mb2C,
         header: {
            'Authorization': 'Bearer ' + Cypress.env('tokenvalue'),
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept': '*/*',
            'Content-Type': 'application/json'
         },
         body: bodyCreateRateOverlap,
         failOnStatusCode:false,      
       }).then(response =>{
         let bodyResponse = JSON.parse(JSON.stringify(response.body))
         expect(response.status).to.eq(400)
     })
   })

   it('Status 400 Create rate card with name is blank', ()=>{
      let bodyCreateNameIsBlank = {
          'name': null, 
          'group': 'shipping-fee',
          'enabled': true,
          'rates': [{
             'start': 1,
             'end': 1.99,
             'value': 10.5,
             'unit': 'BAHT',
             'type': 'FIX_RATE',
          },{
             'start': 2,
             'end': 2.99,
             'value': 15.0,
             'unit': 'BAHT',
             'type': 'FIX_RATE'
          }]
       }
       cy.request({
         method: 'POST',
         url: domain_Mb2c + url_Mb2C,
         header: {
            'Authorization': 'Bearer ' + Cypress.env('tokenvalue'),
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept': '*/*',
            'Content-Type': 'application/json'
         },
         body: bodyCreateNameIsBlank,
         failOnStatusCode:false,      
       }).then(response =>{
         let bodyResponse = JSON.parse(JSON.stringify(response.body))
         expect(response.status).to.eq(400)
     })
   })

   it('Status 400 Create rate card with group is blank', ()=>{
      let bodyCreateNameIsBlank = {
          'name': 'shipping-fee', 
          'group': null,
          'enabled': true,
          'rates': [{
             'start': 1,
             'end': 1.99,
             'value': 10.5,
             'unit': 'BAHT',
             'type': 'FIX_RATE',
          },{
             'start': 2,
             'end': 2.99,
             'value': 15.0,
             'unit': 'BAHT',
             'type': 'FIX_RATE'
          }]
       }
       cy.request({
         method: 'POST',
         url: domain_Mb2c + url_Mb2C,
         header: {
            'Authorization': 'Bearer ' + Cypress.env('tokenvalue'),
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept': '*/*',
            'Content-Type': 'application/json'
         },
         body: bodyCreateNameIsBlank,
         failOnStatusCode:false,      
       }).then(response =>{
         let bodyResponse = JSON.parse(JSON.stringify(response.body))
         expect(response.status).to.eq(400)
     })
   })

   it('Status 400 Create rate card with unit is blank', ()=>{
      let bodyCreateNameIsBlank = {
          'name': 'shipping-fee', 
          'group': null,
          'enabled': true,
          'rates': [{
             'start': 1,
             'end': 1.99,
             'value': 10.5,
             'unit': null,
             'type': 'FIX_RATE',
          },{
             'start': 2,
             'end': 2.99,
             'value': 15.0,
             'unit': 'BAHT',
             'type': 'FIX_RATE'
          }]
       }
       cy.request({
         method: 'POST',
         url: domain_Mb2c + url_Mb2C,
         header: {
            'Authorization': 'Bearer ' + Cypress.env('tokenvalue'),
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept': '*/*',
            'Content-Type': 'application/json'
         },
         body: bodyCreateNameIsBlank,
         failOnStatusCode:false,      
       }).then(response =>{
         let bodyResponse = JSON.parse(JSON.stringify(response.body))
         expect(response.status).to.eq(400)
     })
   })
})