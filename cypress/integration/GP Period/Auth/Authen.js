describe('get token', ()=> {

    it('get token to access MB2C', ()=>{
        let token = '';
        let status = '';
        cy.request({
            method: 'POST',
            url: 'https://alpha-gateway.weomni-test.com/uaa/oauth/token',
            form: true,
            headers: {
                'Authorization': "Basic d29sdmVyaW5lX2NsaWVudF9zYW5pdHk6d29sdmVyaW5lX2NsaWVudF9zYW5pdHk=",
                'Content-Type': "application/x-www-form-urlencoded",
                'X-XSRF-TOKEN': "7c4cbffd-67a5-4f56-8acc-04375deefe88",
                'Cookie': "AWSALB=1GrXzv1TkYf007We2S6liSFOEYcpE4jed8jz226fcRTIbnDimrS3McFLHkVmP3fCyC5JSMoiCuxNgCRWi7++hxme7HCeg2HPk3uHF1JoZykax2A8ZECeb7EBUUdY; AWSALBCORS=1GrXzv1TkYf007We2S6liSFOEYcpE4jed8jz226fcRTIbnDimrS3McFLHkVmP3fCyC5JSMoiCuxNgCRWi7++hxme7HCeg2HPk3uHF1JoZykax2A8ZECeb7EBUUdY; XSRF-TOKEN=56277e95-c919-4923-ba50-6907aea68532",
                'Accept-Encoding': "gzip, deflate, br",
                'Accept': "*/*"
            },
            auth: {
                'username': 'sherlock',
                'password': 'sherlock'
            },
            body:{
                'grant_type': "client_credentials",
            }
        }).then(response =>{
            // cy.log(JSON.stringify(response))
            // cy.log(response.body.access_token)
            token = response.body.access_token
            cy.log(JSON.parse(JSON.stringify(response.body.scope)))
            cy.log(response.body.access_token)
            cy.request({
                method: 'GET',
                url: 'https://alpha-gateway.weomni-test.com/weshop/api/admin/brands/61245d2757158a0001084bfc/gross-profit-period',
                headers: {
                    'Authorization': "Bearer " + token,
                    'Accept-Encoding': "gzip, deflate, br",
                    'Accept': "*/*"
                }
            }).then(response=>{
                expect(response.status).to.equal(200)
                let resBody = JSON.parse(JSON.stringify(response.body))
                console.log(resBody)
                cy.log("====" + resBody[0].brandId)
               
            })
        })
         
    })
})