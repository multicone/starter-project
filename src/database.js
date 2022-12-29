import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { HttpError } from './errors/httpError.js'

dotenv.config()

export function startDB() {
  mongoose.connect(process.env.DB)

  const connection = mongoose.connection

  connection.on('error', () => {
    throw new HttpError('DB connection error', 500)
  })

  connection.once('connected', () => {
    console.log('Database connected')
  })
}
