import { HttpError } from '../errors/httpError.js'
import { Password } from '../lib/password.js'
import { User } from './users.model.js'
import Joi from 'joi'

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body

  const reqSchema = Joi.object({
    username: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  })

  const result = reqSchema.validate({ username, email, password })

  if (result.error) {
    throw new HttpError(result.error.message, 403)
  }

  const existingUser = await User.findOne({
    $or: [{ username: username }, { email: email }],
  })

  if (existingUser) {
    throw new HttpError('User already exists', 403)
  }

  const hashedPassword = await Password.toHash(password)

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  })

  res.json({
    username: user.username,
    email: user.email,
    message: 'Registration Successful',
  })
}

export const allUser = async (req, res) => {
  const users = await User.find({}).exec()
  res.json(users)
}
