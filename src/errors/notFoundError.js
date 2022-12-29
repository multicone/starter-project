import { HttpError } from './httpError.js'

export class NotFoundError extends HttpError {
  constructor() {
    super('Not Found', 404)
    Object.setPrototypeOf(this, NotFoundError.prototype)
  }
}
