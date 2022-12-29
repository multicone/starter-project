import { HttpError } from './httpError.js'

function errorMiddleware(err, req, res, next) {
  if (err instanceof HttpError) {
    res.status(err.statusCode).json(err.toSerializeError())
  } else if (err instanceof Error) {
    res.status(500).json({
      message: err.message,
      stack: err.stack,
    })
  }
}

export default errorMiddleware
