import {createSite, deleteSite} from '@jahia/cypress';

const siteKey = 'mySite';

describe('Dummy test', () => {
    before('Create site', () => {
        cy.login();
        createSite(siteKey, {templateSet: 'luxe-jahia-demo', locale: 'en', serverName: 'localhost'});
        cy.logout();
    });

    it('should pass', () => {
        cy.login();
        cy.visit(`/cms/render/default/en/sites/${siteKey}/home.html`);
        // Cy.get('h1:contains("Home Template")').should('be.visible');
        cy.logout();
    });

    after('Delete site', () => {
        cy.login();
        deleteSite(siteKey);
        cy.logout();
    });
});
