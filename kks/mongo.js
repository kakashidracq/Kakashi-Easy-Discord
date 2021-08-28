const mongo = require('mongoose')
const config = require('../config.json')
const mongoPath = config.mongourl;

module.exports = async () => {
    await mongo.connect(mongoPath, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })

    return mongo
}

mongo.connection.on('connected', () => {
    console.log('mongo is ready to go...')
})