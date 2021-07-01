const Kclient = require('./Structures/KClient');
const config = require('../config.json');


const dclient = new Kclient(config);


dclient.start();