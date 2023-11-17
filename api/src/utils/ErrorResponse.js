class ErrorResponse {
  constructor(status, message, statusCode) {
    this.status = status
    this.message = message
    this.statusCode = statusCode
  }
}

module.exports = ErrorResponse
