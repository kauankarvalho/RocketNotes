const ErrorResponse = require("./ErrorResponse")
const AdminAccount = require("./AdminAccount")

class AdminValidator {
  static validator(id) {
    const { id: adminId } = new AdminAccount()

    const isAdminId = id === adminId
    if (isAdminId) {
      throw new ErrorResponse({
        statusCode: 401,
        status: "error",
        field: "admin",
        message:
          "Alterações de informações ou exclusões na conta de administrador não são permitidas",
      })
    }
  }
}

module.exports = AdminValidator
