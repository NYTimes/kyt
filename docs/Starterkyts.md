# Starter-kyts

starter-kyts are boilerplates built with kyt.

## Recommended starter-kyts

### [Default starter-kyt](https://github.com/nytm/wf-kyt-starter)

The default starter-kyt is for building simple React apps.
Install by running: `node_modules/.bin/kyt setup`
More details [here](/cli).

### [Universal React starter-kyt](https://github.com/nytm/wf-kyt-starter-universal)
This starter-kyt is for building React apps with SSR and React Router.

## How to build a starter-kyt
starter-kyts act as boilerplates for projects. They use kyt as their build system and add additional source code and tools.

1. Choose your starter-kyt architecture. Make sure you are familiar with the [kyt conventions](/docs/conventions.md).

2. Add additional dependencies to a package.json

3. Set up `/src/server/index.js` and `/src/client/index.js` files

4. Optionally add `.stylelintrc` and `.eslintrc` configurations to be copied into the user directory

4. Create documentation

5. Submit to kyt to be considered as a recommended starter-kyt
