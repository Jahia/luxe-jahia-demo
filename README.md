# luxe-jahia-demo

A simple Jahia NPM module created using the NPM module starter project template

## Configuration

If you don't use default configuration for the Docker container name or for Jahia deployments, please modify the provided `.env` file

## Documentation

You can find the documentation on how to use this module on the [Jahia Academy](https://academy.jahia.com/get-started/developers/templating) templating tutorial.
# luxe-jahia-demo

# Build
if not created, create a `.env` file with the following variables (adjust the values to your env) :
```shell
JAHIA_USER=username:password
JAHIA_HOST=http://localhost:8080
JAHIA_DOCKER_NAME=jahia
JAHIA_DEPLOY_METHOD=curl
```

`JAHIA_DEPLOY_METHOD` could be **curl** or **docker**

# Run

1) Enable corepack if needed : 

`yarn enable corepack`

2) Instruct yarn to use the 4.x version if needed :

``yarn set version stable``

3) Install the dependencies :

``yarn``

4) Build and run the project :

``yarn watch``

