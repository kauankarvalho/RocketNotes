const ErrorResponse = require("./ErrorResponse")

class EmailValidator {
  static validator(email) {
    const emailValidator = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/

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
