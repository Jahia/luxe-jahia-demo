# luxe-jahia-demo

A simple Jahia NPM module created using the NPM module starter project template

## Configuration

If you don't use default configuration for the Docker container name or for Jahia deployments, please duplicate the provided `.env.example` as a `.env` file and modify its content.

`JAHIA_DEPLOY_METHOD` can be **curl** or **docker**

## Documentation

You can find the documentation on how to use this module on the [Jahia Academy](https://academy.jahia.com/get-started/developers/templating) templating tutorial.

# Run

1) Enable Corepack if needed : 

`enable corepack`

2) Install the dependencies :

``yarn``

3) Build and run the project :

``yarn watch``

# How to upgrade yarn version to latest stable

This command will upgrade yarn  to the latest stable release and update the yarn installer in .yarn/releases

``yarn set version stable``
