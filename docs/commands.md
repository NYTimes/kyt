# kyt command line interface

kyt includes a CLI with all the commands needed for development.

`setup` includes these commands as scripts in your package.json:
```
npm run dev
```
Or you can run a command with `node_modules/.bin/kyt command`
```
node_modules/.bin/kyt build
```

1. `setup` sets up kyt and installs a specified [starter-kyt](/docs/Starterkyts.md)
2. `dev` starts up a development environment
3. `build` compiles server and client code for production use
4. `start` runs production code
5. `test` runs AVA on all tests in /src
6. `proto` starts the prototyping app
7. `lint` lints src code using ESLint
8. `lint-style` lints src code using StyleLint
9. `help` shows commands and their documentation

## setup

The `setup` command sets up your project with all the application files that you'll need to use kyt.

1. Creates a new [kyt.config.js](/config/kytConfig.md)
2. Creates a .gitignore and .editorconfig
3. Creates linter configurations -  .eslintrc and .stylelintrc files
4. Adds kyt commands to npm scripts

### setup with a starter-kyt

`setup` also allows you to plug a starter-kyt into your app.

Running `kyt setup` will give you the option to install the default starter-kyt.

You can also pass the `-r` flag with any starter-kyt git clone URL:

```
 kyt setup -r git@github.com:nytimes/kyt-starter-react-universal.git
```

`setup` will then:

1. Copy configuration and src files into your project
2. Install necessary npm packages
3. Copy lint configurations into your project
4. Add kyt commands to your npm scripts

### Recommended starter-kyts

#### [Default starter-kyt](https://github.com/nytm/wf-kyt-starter)

The default starter-kyt is for building simple React apps.
Install by running: `node_modules/.bin/kyt setup`

#### [Universal React starter-kyt](https://github.com/nytm/wf-kyt-starter-universal)
This starter-kyt is a good base for building advanced, universal React apps.

```
node_modules/.bin/kyt setup -r git@github.com:nytm/wf-kyt-starter-universal.git
```

#### [Universal Angular2 starter-kyt](https://github.com/delambo/kyt-starter-universal-angular2)
Still a work in progress, but this starter-kyt will server as the base for building advanced, universal Angular2 apps.

```
node_modules/.bin/kyt setup -r git@github.com:delambo/kyt-starter-universal-angular2.git
```

## dev

The `dev` command takes the entry index.js in `src/client/` and `src/server/`, compiles them, and starts client and backend servers on the specified ports. The dev environment includes hot reloading to allow for fast development.
You can update ports in the [kyt config](/docs/kytConfig.md).

## build

The `build` command takes the entry index.js in `src/client/` and `src/server/`, compiles them, and saves them to a build folder. This is an optimized production build.

The build command will also copy the `src/public` directory for static assets.

`build` uses option `-C`(`--config`) to denote a path to a different [kyt.config.js](/docs/kytConfig.md) file

## start

The `start` command takes the compiled code from the production build and runs a node server at the specified port.
You can update ports in the [kyt config](/kytConfig.md).

## test

The `test` command takes test files in your `src/` directory and runs them using [Ava](https://github.com/avajs/ava).
kyt test looks for any `*.test.js` files in `src/`.

## lint

The `lint` command lints all files in the `src/` directory using ESLint.
During `setup`, an `.eslintrc` is copied into the root of your app.
You can add or update any rules in this file.

kyt's ESLint config extends [Airbnb](https://github.com/airbnb/javascript) with a few overrides.

## lint-style

The `lint-style` command uses Stylelint to lint all files in the `src/` directory. By convention, it look for files with a `.css` or `.scss` extension.
During `setup`, a `.stylelintrc` is copied into the root of your app that is pre-configured with defaults for CSS/SASS Modules. You can add or update any of the [Stylelint rules](http://stylelint.io/user-guide/rules/) in your `.stylelintrc`.

## proto

kyt provides a scratch space for building simple prototypes alongside your app.
To get started, follow the setup instructions below.

### How Prototype Works

1. Create a `prototype.js` file.

The proto command takes a `prototype.js` file at the root of your app as an entry for a dev server. You can use this file as the start of your prototype.

2. index.html

The proto command also provides an `index.html` file with the following content:
```
<div id="root"></div>
<script src="/prototype/bundle.js"></script>
```

`/prototype/bundle.js` loads the JavaScript assets.


### The proto command

Running `proto` starts a dev server at the port specified in your `kyt.config.js`

```
✅  webpack-dev-server http://localhost:3002/prototype
```

### Updating the prototype Webpack config

You can update the prototype config by using the modifyWebpackConfig function in `kyt.config.js`.
See [modifyWebpackConfig](/kytConfig.md) instructions.

