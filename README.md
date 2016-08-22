# kyt
Your escape from configuration hell

## What is kyt?
kyt is a dev tool created to let developers build node apps without having to spend hours messing with setup, configuration, and build tools.


## How it Works

kyt uses webpack and babel to manage a dev and production builds for node apps. It [supports](/config/webpackConfig.md) popular libaries including React and css-modules. 

For advanced use cases, kyt enables developers to add additional tools and configuration.
See our [config override instructions](/config/kytConfig.md#modifyWebpackConfig) for details, and our [recipes](/Recipes.md) for examples.

## Requirements

1. Node v6 is required.

That's it.

## Installation

1. Create a repo with a package.json file
2. `npm install --save git@github.com:nytm/wf-kyt.git`
3. `node_modules/.bin/kyt setup` - This will set up your project with all things kyt. Learn more about [setup](/cli). 

We recommend installing kyt as a dependency in your project.

## CLI

kyt includes a CLI with all the basic commands needed for development.
`setup` will include these commands as scripts in your package.json.
You can also run them with `node_modules/.bin/kyt commandName`

* `dev` starts a Webpack dev server
* `build` compiles server and client code for production use
* `run` runs production code
* `test` runs ava on all tests in /src
* `proto` starts the prototyping app
* `lint` lints src code using ESLint
* `lint-style` lints src code using Stylelint
* `help` shows commands and their documentation
* `setup` sets up kyt and installs a specified [starter-kyt](/Starterkyts.md)

See our [CLI docs](/cli) for further details.

## Conventions

kyt follows a few simple conventions.

All projects must have the following structure:
```
  src/
    client/
      index.js
    server/
      index.js
```
Each `index.js` file acts as the build entry.
If you're setting up a new project see additional details [here](/conventions.md). 


## Configuration

kyt allows you to specify options in a `kyt.config.js` file.
See [here](https://github.com/nytm/wf-kyt/kytConfig.md) for instructions.

kyt uses Webpack to compile src code and run tests.
See the list of [supported functionality](/config/webpackConfig.md)
or our [recipes](/Recipes.md) for easy config extension.


## starter-kyts

kyt provides all the basic functionality for development. It can easily be used standalone or integrated into existing projects. 

starter-kyts are boilerplates built to work alongside kyt. 
They include additional tools and libraries for a variety of projects.

See our recommended list of [starter-kyts](/Starterkyts.md) 


### How to build a starter-kyt

Community supported starter-kyts can be built to support a variety of projects. 
See additional info [here](/Starterkyts.md)


## How to contribute to kyt

Want to help? See details [here](/CONTRIBUTING.md) 


## Need Help?

1. Check our [FAQ](/FAQ.md)
2. Submit an issue 
2. Check out our [recipes](/Recipes.md) for extending kyt 
