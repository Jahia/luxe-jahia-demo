# Luxe

Luxe is the demo website for Jahia 8.2, built using the [JavaScript Modules](https://academy.jahia.com/tutorials-get-started/frontend-developer/introduction) technology. Through a fictional real estate agency, it showcases the capabilities of Jahia and the JavaScript Modules technology.

This repository is a [monorepo](https://monorepo.tools/#understanding-monorepos) that contains different packages, each with its own purpose:

- [`template-set`](./packages/template-set/): the Jahia module that, when pushed on a Jahia instance, allows creating all Luxe components and content types.
- [`design-system`](./packages/design-system/): a collection of reusable React components used by the template-set.
- [`prepackaged-site`](./packages/prepackaged-site/): a prepackaged site that can be used to quickly get a populated Luxe site.

# Build and deploy

To work in this monorepo, you'll need a functional [Node.js+Yarn](https://nodejs.org/en/download) installation. Once cloned, the following commands are available:

```bash
# Install the dependencies of all packages
yarn install

# Start a local Jahia instance
docker compose up --wait

# Build all modules
yarn build

# Start the development mode for the template-set
yarn dev

# Start the Storybook for the design system
yarn storybook
```
