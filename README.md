# luxe-jahia-demo

A simple Jahia Javascript module created using the [Jahia Javascript modules starter project template](https://github.com/Jahia/npm-create-module)

## Configuration

If you don't use default configuration for the Docker container name or for Jahia deployments, please duplicate the provided `.env.example` as a `.env` file and modify its content.

`JAHIA_DEPLOY_METHOD` can be **curl** or **docker**

## Documentation

You can find the documentation on how to use this module on the [Jahia Academy](https://academy.jahia.com/get-started/developers/templating) templating tutorial.

# Build and deploy

1) if not created, create a `.env` file with the following variables (adjust the values to your env) :
```shell
JAHIA_USER=username:password
JAHIA_HOST=http://localhost:8080
JAHIA_DOCKER_NAME=jahia
JAHIA_DEPLOY_METHOD=docker
```

`JAHIA_DEPLOY_METHOD` could be **curl** or **docker**

2) Enable Corepack if needed : 

`enable corepack`

3) Install the dependencies :

``yarn install``

4) Build and deploy the project :

``yarn build && yarn deploy``

4) Automatically build and deploy the project on file changes :

``yarn watch``

## How to upgrade yarn version to latest stable

This command will upgrade yarn  to the latest stable release and update the yarn installer in .yarn/releases

``yarn set version stable``
