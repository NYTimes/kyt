# kyt conventions

In order to use kyt, your project must follow these conventions.

## Directory Structure

kyt follows several conventions for folder structure. If you're setting up a new project, structure your directory as follows.
```
src/
  /client
    index.js // Webpack entry for client code
  /server
    index.js // Webpack entry for server code
```

## Public directory

During `build`, kyt copies a `/src/public` directory into the build folder. This folder is intended to be used to serve static assets.

## File extensions

### JavaScript
All `.js` files in `/src` are transpiled with Babel.

### CSS and Sass
`.css` files are intended for writing css with CSS Modules
`.scss` files are intended for writing Sass with CSS Modules

## Environment Variables

kyt sets several environment variables with useful information about the app environment.

* `NODE_ENV` Node environment currently running (eg. production)
* `SERVER_PORT` Port your node server should listen on.
* `CLIENT_PORT` Port the client assets server is listening on.
* `PUBLIC_PATH` Full path for static assets server
* `PUBLIC_DIR` Relative path to the public directory
* `ASSETS_MANIFEST` Object with build assets paths

For examples of how to use these environment variables, checkout out the simple React [starter-kyt](https://github.com/nytm/wf-kyt-starter)

## kyt.config.js
The kyt config file must live in the root of your repository.
See further instructions [here](/docs/kytConfig.md)

## Testing
The `kyt test` command finds all files with `*.test.js` in the `/src` directory.

## Linting

The `kyt lint` command finds all files with `.js` extension in `/src`

Specify lint rules with a `.eslintrc` file in the root of your project.

## Style Linting
The `kyt lint-style` command finds all files with `.css` and `.scss` extensions in `/src`

Specify lint rules with a `.stylelintrc` file in the root of your project.
