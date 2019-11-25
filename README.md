informatics
===========

A toolkit for Informatics ICPC judging system

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/informatics.svg)](https://npmjs.org/package/informatics)
[![Downloads/week](https://img.shields.io/npm/dw/informatics.svg)](https://npmjs.org/package/informatics)
[![License](https://img.shields.io/npm/l/informatics.svg)](https://github.com/gbougakov/informatics-toolkit/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g informatics
$ informatics COMMAND
running command...
$ informatics (-v|--version|version)
informatics/0.0.3 darwin-x64 node-v11.13.0
$ informatics --help [COMMAND]
USAGE
  $ informatics COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`informatics exportall [PATH]`](#informatics-exportall-path)
* [`informatics help [COMMAND]`](#informatics-help-command)
* [`informatics login`](#informatics-login)

## `informatics exportall [PATH]`

Export all your parcels from Informatics

```
USAGE
  $ informatics exportall [PATH]

OPTIONS
  -k, --onlyOK  Only export parcels marked as "OK"
```

_See code: [src/commands/exportall.js](https://github.com/gbougakov/informatics-toolkit/blob/v0.0.3/src/commands/exportall.js)_

## `informatics help [COMMAND]`

display help for informatics

```
USAGE
  $ informatics help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.1/src/commands/help.ts)_

## `informatics login`

Log in with your Informatics account

```
USAGE
  $ informatics login
```

_See code: [src/commands/login.js](https://github.com/gbougakov/informatics-toolkit/blob/v0.0.3/src/commands/login.js)_
<!-- commandsstop -->
