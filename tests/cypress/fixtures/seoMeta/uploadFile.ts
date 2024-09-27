export const uploadFile = (fixturePath: string, parentPath: string, name: string, mimeType: string) => {
    return cy.fixture(fixturePath, 'binary')
        .then(image => {
            const blob = Cypress.Blob.binaryStringToBlob(image, mimeType);
            const file = new File([blob], name, {type: blob.type});
            return cy.apollo({
                mutationFile: 'seoMeta/uploadFile.graphql',
                variables: {
                    path: parentPath,
                    name,
                    mimeType,
                    file
                }
            });
        });
};
