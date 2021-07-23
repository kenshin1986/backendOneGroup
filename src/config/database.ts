import mongoose, { ConnectOptions } from 'mongoose'

import config from './config'

const dbOptions: ConnectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
}

mongoose.connect(config.DB.URI, dbOptions)

const connection = mongoose.connection

connection.once('open', () => console.log('Mongodb connection stablished'))

connection.once('error', err => {
    console.log(err)
    process.exit(0)
})
