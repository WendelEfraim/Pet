const mongoose = require('mongoose')

async function main() {
    await mongoose.connect('mongodb://0.0.0.0:27017')
    console.log('1° - Conectou com mongoose!')
}
main().catch((err) => console.log(err))

module.exports = mongoose