export class HttpError extends Error {
  statusCode = 400

  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode
    Object.setPrototypeOf(this, HttpError.prototype)
  }

  toSerializeError() {
    return {
      message: this.message,
      stack: this.stack,
    }
  }
}
