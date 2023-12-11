const InMemoryUserRepository = require("../repositories/InMemoryUserRepository")
const TestUserAccount = require("../utils/TestUserAccount")
import { describe, beforeEach, test, expect } from "vitest"
const UserDeleteService = require("./UserDeleteService")
const ErrorResponse = require("../utils/ErrorResponse")
const crypto = require("node:crypto")
const { hash } = require("bcryptjs")

describe("UserDeleteService", () => {
  let inMemoryUserRepository
  let userDeleteService

  let john

  beforeEach(async () => {
    inMemoryUserRepository = new InMemoryUserRepository()
    userDeleteService = new UserDeleteService(inMemoryUserRepository)

    john = {
      id: crypto.randomUUID(),
      name: "John",
      email: "john@email.com",
      password: await hash("1234", 8),
      avatar: null,
    }

    inMemoryUserRepository.users = [john]
  })

  test("should reject user delete with empty password field", () => {
    expect(async () => {
      await userDeleteService.execute({
        id: john.id,
        password: "",
      })
    }).rejects.toEqual(
      new ErrorResponse({
        statusCode: 400,
        status: "warning",
        field: "password",
        message: "Por favor, insira sua senha",
      }),
    )
  })

  test("should reject user delete with invalid password", () => {
    expect(async () => {
      await userDeleteService.execute({
        id: john.id,
        password: "4321",
      })
    }).rejects.toEqual(
      new ErrorResponse({
        statusCode: 401,
        status: "error",
        field: "password",
        message: "Senha inválida",
      }),
    )
  })

  test("should reject user delete with the same id as the test user id", () => {
    const testUser = new TestUserAccount()

    inMemoryUserRepository.users = [testUser]

    expect(async () => {
      await userDeleteService.execute({
        id: testUser.id,
        password: "1234",
      })
    }).rejects.toEqual(
      new ErrorResponse({
        statusCode: 401,
        status: "error",
        field: "test user",
        message:
          "Alterações de informações ou exclusões na conta de demonstração não são permitidas",
      }),
    )
  })

  test("should user delete when valid id and password are provided", async () => {
    await userDeleteService.execute({
      id: john.id,
      password: "1234",
    })

    expect(inMemoryUserRepository.users).not.contains(john)
  })
})
