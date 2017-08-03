# kyt command line interface

kyt includes a CLI with all the commands needed for development.

`kyt-cli setup` includes these commands as scripts in your package.json:
```
npm run dev
```
Or you can run a command with `node_modules/.bin/kyt command`
```
node_modules/.bin/kyt build
```

1. [starter-kyt](/docs/Starterkyts.md)
2. [`dev`](/docs/commands.md#dev) starts up a development environment
3. [`build`](/docs/commands.md#build) compiles server and client code for production use
4. [`test`](/docs/commands.md#test) runs all tests in /src
5. [`proto`](/docs/commands.md#proto) starts the prototyping app
6. [`lint-script`](/docs/commands.md#lint-script) lints src code using ESLint
7. [`lint-style`](/docs/commands.md#lint-style) lints src code using StyleLint
8. [`help`](/docs/commands.md#help) shows commands and their documentation

## dev

The `dev` command takes the entry index.js in `src/client/` and `src/server/`, compiles them, and starts client and backend servers. The dev environment includes hot reloading to allow for fast development.

If `hasServer` is set to `false` in [kyt.config.js](/docs/kytConfig.md), `src/server/` is ignored and no backend server is started.

Optionally, you can configure urls for the development servers in the [kyt config](/docs/kytConfig.md).

You can pass flags to the node server through `kyt dev`.
For example:
```
kyt dev -- --inspect
```
will run the [node debugging for Chrome DevTools](https://medium.com/@paul_irish/debugging-node-js-nightlies-with-chrome-devtools-7c4a1b95ae27#.mpuwgy17v)

## build

The `build` command takes the entry index.js in `src/client/` and `src/server/` (ignoring the latter if `hasServer` set to false in [kyt.config.js](/docs/kytConfig.md)), compiles them, and saves them to a build folder. This is an optimized production build.

The build command will also copy the `src/public` directory for static assets.

`build` uses option `-C`(`--config`) to denote a path to a different [kyt.config.js](/docs/kytConfig.md) file

## test

The `test` command takes test files in your `src/` directory and runs them using [Jest](http://facebook.github.io/jest/).
kyt test looks for any `*.test.js` files in `src/`.

You can pass flags to jest through `kyt test`.
```
kyt test -- --no-cache
```

### test-watch

Runs Jest with `--watch`.

### test-coverage

Runs Jest with `--coverage`.

### Updating the Jest config

You can update the Jest configuration by defining a `modifyJestConfig` function in your `kyt.config.js`.
See [modifyJestConfig](/docs/kytConfig.md#modifyJestConfig) instructions.

### test globals

kyt will inject DOM globals, like `global.window` and `global.document` into every test. If you need to remove or add to the globals, then you can override the Jest [`setupFiles` configuration](https://github.com/NYTimes/kyt/blob/5c80c117ae98268187e178388ae3b17a14f84c12/packages/kyt-core/config/jest.js#L21) in your `modifyJestConfig` callback.

### Troubleshooting

#### Tests are hanging and/or `test-watch` is broken on OSX Sierra

See [facebook/jest#1767](https://github.com/facebook/jest/issues/1767) for various workarounds, the most common of which are installing or reinstalling [Watchman](https://facebook.github.io/watchman/).

## lint-script

The `lint-script` command lints all files in the `src/` directory using ESLint.
During `kyt-cli setup`, an `.eslintrc.json` file is copied into the root of your app which extends kyt's base configuration.
You can add or override rules in this file.

kyt's base ESLint config extends [Airbnb](https://github.com/airbnb/javascript) with a few overrides. You can find kyt's base ESLint configuration [here](/packages/eslint-config-kyt/eslintrc.json). Read the kyt style guide [here](/packages/eslint-config-kyt/README.md)

Flags can be passed to ESLint through `kyt lint-script`

```
kyt lint-script -- --fix
```

## lint-style

The `lint-style` command uses Stylelint to lint all files in the `src/` directory. By convention, it looks for files with a `.css` or `.scss` extension.
During `kyt-cli setup`, a `.stylelintrc.json` is copied into the root of your app that extends kyt's base configuration, pre-configured with [config-standard](https://github.com/stylelint/stylelint-config-standard) with some overrides for CSS/Sass Modules. You can find kyt's base Stylelint configuration [here](/packages/stylelint-config-kyt/stylelintrc.json). You can add or update any of the [Stylelint rules](http://stylelint.io/user-guide/rules/) in your `.stylelintrc.json`. Read the kyt style guide [here](/packages/stylelint-config-kyt/README.md).

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

Running `proto` starts a dev server. Optionally, you can configure the prototype server url in your [kyt.config.js](/docs/kytConfig.md).

```
prototypeURL: "http://localhost:3002/prototype"
```

### Updating the prototype Webpack config

You can update the prototype config by using the modifyWebpackConfig function in `kyt.config.js`.
See [modifyWebpackConfig](/docs/kytConfig.md#modifywebpackconfig) instructions.
