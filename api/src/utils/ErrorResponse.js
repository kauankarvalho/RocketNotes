class ErrorResponse {
  constructor({ statusCode, status, field, message }) {
    this.statusCode = statusCode
    this.status = status
    this.field = field
    this.message = message
  }
}

module.exports = ErrorResponse
