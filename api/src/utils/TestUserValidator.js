const TestUserAccount = require("./TestUserAccount")
const ErrorResponse = require("./ErrorResponse")

class TestUserValidator {
  static validator(id) {
    const { id: testUserId } = new TestUserAccount()

    const isTestUserId = id === testUserId
    if (isTestUserId) {
      throw new ErrorResponse({
        statusCode: 401,
        status: "error",
        field: "test user",
        message:
          "Alterações de informações ou exclusões na conta de demonstração não são permitidas",
      })
    }
  }
}

module.exports = TestUserValidator
