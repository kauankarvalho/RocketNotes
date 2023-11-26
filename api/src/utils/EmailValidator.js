const ErrorResponse = require("./ErrorResponse")

class EmailValidator {
  static validator(email) {
    const emailValidator = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    const invalidEmail = !emailValidator.test(email)
    if (invalidEmail) {
      throw new ErrorResponse({
        statusCode: 400,
        status: "warning",
        field: "email",
        message: "Insira um e-mail válido",
      })
    }
  }
}

module.exports = EmailValidator
