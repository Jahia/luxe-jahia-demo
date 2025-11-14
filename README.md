# Luxe

**Luxe is** a fictional luxury real estate agency and **the demo website of Jahia** starting in version 8.2. It serves two purposes:

- **Self-discovery of Jahia as an editor.**

  If you want to try Jahia on your own and skip [a sales call](https://www.jahia.com/demo), you can do that on a fully functional website. The whole stack (Jahia, template set, content) is available in a single container for that purpose:

  ```bash
  docker run --name jahia-discovery -itp 8080:8080 jahia/jahia-discovery-dev:8.2.2.0-rev1
  ```

  Your Jahia instance will take less than a minute to start (download excluded) and then be available on [localhost:8080](http://localhost:8080). Click on **Login** in the footer to get access to the edition interface.

  If you want a complete product demo, please [reach out to us](https://www.jahia.com/demo).

- **A large, open-source, high-quality sample of Jahia code.**

  Luxe acts as the reference implementation of many common Jahia aspects: views and templates, island architecture, GraphQL and JCR queries, usage of a design system, etc.

**This repository is not meant to be consumed as a tutorial;** we have a training course to introduce you to the basics of Jahia development: [Getting Started with JavaScript Modules](https://academy.jahia.com/tutorials-get-started/front-end-developer/introduction).

This repository is a [monorepo](https://monorepo.tools/#what-is-a-monorepo) that contains three packages, each with its own purpose. We wrote extensive documentation for each of these packages, click on the links below to reach other READMEs:

- [`design-system`](./packages/design-system/): a collection of reusable React components used by the template-set. This is a basic design system conceived to work in any React project, **it is not Jahia-specific.**

- [`template-set`](./packages/template-set/): the Jahia module that, when pushed on a Jahia instance, allows creating all Luxe components and content types.

  It is a [JavaScript Module](https://academy.jahia.com/documentation/jahia-cms/jahia-8.2/developer/javascript-module-development/introduction-to-jahia-javascript-modules), built with React and CSS Modules.

- [`prepackaged-site`](./packages/prepackaged-site/): a prepackaged site that can be used to quickly get a populated Luxe site.

## Working Locally

### Building for Production

To create production artifacts of the template set and the prepackaged site, you'll need [Maven](https://maven.apache.org/):

```bash
# Build the monorepo
mvn package
```

This will create the following artifacts:

- `packages/template-set/target/luxe-jahia-demo-<version>.tgz`: production artifact of the template set.

  This artifact is available on the Jahia Store under the [Luxe Jahia Demo](https://store.jahia.com/contents/modules-repository/org/jahia/modules/javascript/luxe-jahia-demo.html) name.

  The module can be installed manually on any Jahia instance through the **Modules** administration interface: [localhost:8080/jahia/administration/manageModules](http://localhost:8080/jahia/administration/manageModules).

- `packages/prepackaged-site/target/luxe-prepackaged-website-<version>.jar`: contains all the content of the demo website.

  This artifact is available on the Jahia Store under the [Luxe pre-packaged website](https://store.jahia.com/contents/modules-repository/org/jahia/modules/luxe-prepackaged-website.html) name.

  The module can be installed manually on any Jahia instance through the **Modules** administration interface. Once installed, you can import its content by selecting "Luxe Demo Website - Prepackaged" in the **Import prepackaged project** section of the **Projects** page: [localhost:8080/jahia/administration/webProjectSettings](http://localhost:8080/jahia/administration/webProjectSettings).

The design system has no production artifact as it is not used externally to this monorepo.

### Running in Development Mode

To develop in this monorepo, you'll need a functional [Node.js+Yarn](https://nodejs.org/en/download) installation. Once cloned, the following commands are available:

```bash
# Install the dependencies of all packages
yarn install

# Start a local Jahia instance
docker compose up --wait

# Start the development mode for the template-set
yarn dev

# Start the Storybook for the design system
yarn storybook
```
