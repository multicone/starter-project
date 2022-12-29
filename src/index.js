import express from 'express'
import 'express-async-errors'
import dotenv from 'dotenv'
import errorMiddleware from './errors/errorMiddleware.js'
import { HttpError } from './errors/httpError.js'
import { NotFoundError } from './errors/notFoundError.js'
import { startDB } from './database.js'
import { userRouter } from './users/users.router.js'
dotenv.config()

const app = express()

app.use(express.json())

app.use(userRouter)

app.all('*', (req, res) => {
  throw new NotFoundError()
})

startDB()

app.listen(process.env.PORT, () => {
  console.log('Server is listening on ' + process.env.PORT)
})

app.use(errorMiddleware)
