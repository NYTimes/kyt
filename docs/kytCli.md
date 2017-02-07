# kyt-cli

kyt-cli is a tool for creating new kyt projects.

## Install kyt-cli
`npm install -g kyt-cli`


## commands
 - `kyt-cli setup`
 - `kyt-cli list`

## `setup` command
The `setup` command sets up your project with all the application files that you'll need to use kyt:

1. Creates a new [kyt.config.js](/docs/kytConfig.md)
2. Install necessary npm packages
3. Creates a .gitignore and .editorconfig
4. Creates linter configurations -  .eslintrc.json and .stylelintrc.json files
5. Adds kyt commands to npm scripts

If kyt finds any files with duplicate names, it will back up your file before replacing it.

`setup` takes you through the process of creating a new kyt project with a set of interactive questions. If you wish to automate this process you can use these optional flags:

- `-d` The name of the new project directory. If not specified kyt will install the project in your current working directory.
- `-r` The Github url for a starter-kyt. If not specified you will be prompted to select a starter-kyt from the supported list.
- `-k` For local development purposes, you can override the version of kyt to be installed by passing in a new version number or a file path eg. `file:../../my-local-kyt`
- `-p` The package manager to use, either `npm` or `yarn`. If not specified, defaults to `yarn` if it's installed globally, otherwise `npm` will be used.

### Setup a new project
`kyt-cli setup`

kyt will provide you with a list of supported starter-kyts to install

The supported starter-kyts are:

- [kyt-starter-universal](/packages/kyt-starter-universal)
- [kyt-starter-static](/packages/kyt-starter-static)

### Setup a starter-kyt from github

`kyt-cli setup`
Select `I have my own url` when prompted to set up a starter-kyt

### Setup an existing project
Run `kyt-cli setup` in your project directory.
Select `I don't want a starter-kyt` when prompted to setup with a starter-kyt.


## `list` command
The `list` command lists the supported and recommended starter-kyts.
It includes:
  - A description of best use cases
  - Installation instructions

`kyt-cli list`

### Recommended starter-kyts

#### [Universal React starter-kyt](/packages/starter-kyts/kyt-starter-universal)
This default starter-kyt is a good base for building advanced, universal React apps.

Install by running:
```
kyt-cli setup
```
and select `universal`

#### [Static starter-kyt](/packages/starter-kyts/kyt-starter-static)

This starter-kyt is for creating client side React apps.
Install by running:
```
kyt-cli setup
```
and select `static`

#### [Universal Angular2 starter-kyt](https://github.com/delambo/kyt-starter-universal-angular2)
Still a work in progress, but this starter-kyt will serve as the base for building advanced, universal Angular2 apps.

```
kyt-cli setup
```
Select `I have my own url`
and paste https://github.com/delambo/kyt-starter-universal-angular2.git
