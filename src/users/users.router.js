import express, { Router } from 'express'
import { allUser, registerUser } from './users.controller.js'

const userRouter = express.Router()

userRouter.get('/users', allUser)
userRouter.post('/users', registerUser)

export { userRouter }
