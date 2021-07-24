import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import userRouter from './routes/user.routes'
import logRouter from './routes/log.routes'
import { saveLogs } from './middlewares/log.middleware'
import swaggerOptions from './config/swagger.config'

const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

//initializations
const app = express()
const swaggerDocs = swaggerJsDoc(swaggerOptions)

//settings
app.set('port', process.env.PORT || 8080)

//middlewares
app.use(morgan('dev'))
app.use(cors())
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//routes
app.use('/users', userRouter, saveLogs)
app.use('/logs', logRouter)

export default app;
