const Kclient = require('./Structures/KClient');
const config = require('../config.json');


const client = new Kclient(config);


client.start();