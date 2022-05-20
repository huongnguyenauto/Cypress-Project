/// <reference types = "cypress"/>

describe('get token', ()=> {

    it('get token to access MB2C', ()=>{
        let token = '';
        cy.request({
            method: 'POST',
            url: 'https://alpha-platform.weomni-test.com/uaa/oauth/token',
            form: true,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic YzUyNDg0OGItM2VmNy00OWI5LTlmM2EtNDYwZTdiNjNjMWU2OnMwWk9tWkgpdzczKjBnJUY=',
                'Cookie': 'AWSALB=pWbee4G9p922ab0GbI8FRgpoxzpyQM2R0wqaFibbfoH04/PjamzcQcRl51cfjnp/jZhL2feRVVfDVyMAcKBWZfgdVPYCMpH1oz4f/mO+N9v6EVsa6A4spILihrtg; AWSALBCORS=pWbee4G9p922ab0GbI8FRgpoxzpyQM2R0wqaFibbfoH04/PjamzcQcRl51cfjnp/jZhL2feRVVfDVyMAcKBWZfgdVPYCMpH1oz4f/mO+N9v6EVsa6A4spILihrtg; XSRF-TOKEN=c133567b-ce7b-4ece-be14-fbb09ae0bafc',
                'Accept-Encoding': "gzip, deflate, br",
                'Accept': "*/*",
            },
            body:{
                'client_id': "c524848b-3ef7-49b9-9f3a-460e7b63c1e6",
                'client_secret': "s0ZOmZH)w73*0g%F",
                'grant_type': "client_credentials",
            }
        }).then(response =>{
            // cy.log(JSON.stringify(response))
            // cy.log(response.body.access_token)
            token = response.body.access_token
            cy.log(token)
        })
    })

})