const InMemoryUserRepository = require("../repositories/InMemoryUserRepository")
const UserDeleteService = require("./UserDeleteService")
const ErrorResponse = require("../utils/ErrorResponse")
import { beforeEach, test, expect } from "vitest"
const crypto = require("node:crypto")

let inMemoryUserRepository
let userDeleteService

let john

beforeEach(() => {
  inMemoryUserRepository = new InMemoryUserRepository()
  userDeleteService = new UserDeleteService(inMemoryUserRepository)

  john = {
    id: crypto.randomUUID(),
    name: "John",
    email: "john@email.com",
    password: "$2a$08$hiUvBe9tESYEj0.QuyChBOAwOio/AvoRTXjBxGmp4OS12uobAyTvy",
    avatar: null,
  }

  inMemoryUserRepository.users = [john, ...inMemoryUserRepository.users]
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
      password: "321",
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

test("should delete user when valid id and password are provided", async () => {
  await userDeleteService.execute({
    id: john.id,
    password: "123",
  })

  expect(inMemoryUserRepository.users).not.contains(john)
})
