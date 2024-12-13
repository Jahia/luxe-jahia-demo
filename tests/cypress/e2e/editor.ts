import {createSite, deleteSite} from '@jahia/cypress';

const siteKey = 'mySite';

function checkLoginBlockIsLoaded() {
    let loginBlockSelector = 'footer.lux-site-footer .container .row .col div[data-reacthydrate][data-hydrated=true]';
    cy.get(loginBlockSelector + ' h5:contains("root")').should('be.visible');
    cy.get(loginBlockSelector + ' a:contains("live")').should('be.visible');
    cy.get(loginBlockSelector + ' a:contains("edit")').should('be.visible');
    cy.get(loginBlockSelector + ' button:contains("logout")').should('be.visible');
}

describe('Test the site loads correctly within the editor', () => {
    before('Create site', () => {
        cy.login();
        createSite(siteKey, {templateSet: 'luxe-jahia-demo', locale: 'en', serverName: 'localhost'});
        cy.logout();
    });

    it('should load the page in preview mode', () => {
        cy.login();
        cy.visit(`/cms/render/default/en/sites/${siteKey}/home.html`);
        checkLoginBlockIsLoaded();
        cy.logout();
    });

    it('should load the page in customized preview mode', () => {
        cy.login();
        cy.visit(`/cms/render/default/en/sites/${siteKey}/home.html?alias=bill`);
        checkLoginBlockIsLoaded();
        cy.logout();
    });

    after('Delete site', () => {
        cy.login();
        deleteSite(siteKey);
        cy.logout();
    });
});
