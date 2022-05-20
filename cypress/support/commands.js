// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// Cypress.Commands.add('getAPI', (url) => {

Cypress.Commands.add('getTokenToAccessMb2c', () => {
    cy.request({
        method: 'POST',
        url: 'https://alpha-gateway.weomni-test.com/uaa/oauth/token',
        form: true,
        // headers: {
        //     'Authorization': "Basic d29sdmVyaW5lX2NsaWVudF9zYW5pdHk6d29sdmVyaW5lX2NsaWVudF9zYW5pdHk=",
        //     'Content-Type': "application/x-www-form-urlencoded",
        //     'X-XSRF-TOKEN': "7c4cbffd-67a5-4f56-8acc-04375deefe88",
        //     'Cookie': "AWSALB=1GrXzv1TkYf007We2S6liSFOEYcpE4jed8jz226fcRTIbnDimrS3McFLHkVmP3fCyC5JSMoiCuxNgCRWi7++hxme7HCeg2HPk3uHF1JoZykax2A8ZECeb7EBUUdY; AWSALBCORS=1GrXzv1TkYf007We2S6liSFOEYcpE4jed8jz226fcRTIbnDimrS3McFLHkVmP3fCyC5JSMoiCuxNgCRWi7++hxme7HCeg2HPk3uHF1JoZykax2A8ZECeb7EBUUdY; XSRF-TOKEN=56277e95-c919-4923-ba50-6907aea68532",
        //     'Accept-Encoding': "gzip, deflate, br",
        //     'Accept': "*/*"
        // },
        headers: {
            'Authorization': "Basic YzUyNDg0OGItM2VmNy00OWI5LTlmM2EtNDYwZTdiNjNjMWU2OnMwWk9tWkgpdzczKjBnJUY=",
            'Content-Type': "application/x-www-form-urlencoded",
            'Cookie': "AWSALB=pWbee4G9p922ab0GbI8FRgpoxzpyQM2R0wqaFibbfoH04/PjamzcQcRl51cfjnp/jZhL2feRVVfDVyMAcKBWZfgdVPYCMpH1oz4f/mO+N9v6EVsa6A4spILihrtg; AWSALBCORS=pWbee4G9p922ab0GbI8FRgpoxzpyQM2R0wqaFibbfoH04/PjamzcQcRl51cfjnp/jZhL2feRVVfDVyMAcKBWZfgdVPYCMpH1oz4f/mO+N9v6EVsa6A4spILihrtg; XSRF-TOKEN=c133567b-ce7b-4ece-be14-fbb09ae0bafc",
            'Accept-Encoding': "gzip, deflate, br",
            'Accept': "*/*"
        },
        auth: {
            'username': 'c524848b-3ef7-49b9-9f3a-460e7b63c1e6',
            'password': 's0ZOmZH)w73*0g%F'
        },
        body: {
            'grant_type': "client_credentials",
        }
    }).then(response => {
        let responseBody = JSON.parse(JSON.stringify(response.body))
        let token = responseBody.access_token
        console.log(token)
        Cypress.env('tokenvalue', token)
    })
})


