import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import passport from 'passport'
import passportMiddleware from './middlewares/passport.middleware'

import userRouter from './routes/user.routes'
import logRouter from './routes/log.routes'
import productRouter from './routes/product.routes'
import uploadRouter from './routes/upload.routes'
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
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use(express.urlencoded({ extended: false }))
app.use(express.static(`${__dirname}/public`));
app.use(express.json())
app.use(passport.initialize())
passport.use(passportMiddleware)

//routes
app.use('/users', userRouter, saveLogs)
app.use('/logs', passport.authenticate('jwt', { session: false }), logRouter)
app.use('/products', passport.authenticate('jwt', { session: false }), productRouter)
app.use('/upload', uploadRouter)

export default app;
