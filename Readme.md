# Sylphy
[![Studio 777](https://discordapp.com/api/guilds/247727924889911297/embed.png)](https://discord.gg/bBqpAKw) [![NPM version](https://img.shields.io/npm/v/sylphy.svg?style=flat-square)](https://www.npmjs.com/package/sylphy) [![Dependency Status](https://img.shields.io/david/abalabahaha/eris.svg?style=flat-square)](https://david-dm.org/abalabahaha/eris)

<a href="https://nodei.co/npm/sylphy/"><img src="https://nodei.co/npm/sylphy.png?downloads=true&stars=true" alt="NPM info" /></a>

**Sylphy** is an advanced, efficient and highly customisable framework for Discord command bots written in Node.js

## Getting Started
### Requirements
* **Node.js 8.0.0+**

As the bot framework extends the [Eris](https://github.com/abalabahaha/Eris) client, please refer to the docs [here](https://abal.moe/Eris/docs).

The full Sylphy documentation can be found [here](https://pyraxo.github.io/sylphy).

### Usage
```bash
$ npm install --save sylphy
```

#### Example
```js
const Bot = require('sylphy')

const client = new Bot({
  token: 'your token here',
  modules: 'path/to/modules',
  // Eris client options here
})

client.register('commands', 'path/to/commands')

client.run()
```

### Documentation
To view the API, please visit the [wiki](https://github.com/pyraxo/sylphy/wiki).

## Examples

* [Yui](https://github.com/pyraxo/yui) - by [pyraxo](https://github.com/pyraxo)
* [Satomi](https://github.com/envyist/satomi) - by [envyist](https://github.com/envyist)
* [Sagiri](https://sagiri.party/) - by [Kiru](https://github.com/itskiru)

## License
Copyright (C) 2021 KAKASHI#3709

This repositories is provided for free use 
