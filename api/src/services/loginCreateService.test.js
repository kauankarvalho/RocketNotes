const InMemoryUserRepository = require("../repositories/InMemoryUserRepository")
const LoginCreateService = require("../services/LoginCreateService")
const ErrorResponse = require("../utils/ErrorResponse")
import { beforeEach, test, expect } from "vitest"
const crypto = require("node:crypto")

let inMemoryUserRepository
let loginCreateService
let john

beforeEach(() => {
  inMemoryUserRepository = new InMemoryUserRepository()
  loginCreateService = new LoginCreateService(inMemoryUserRepository)

  john = {
    id: crypto.randomUUID(),
    name: "John",
    email: "john@email.com",
    password: "$2a$08$hiUvBe9tESYEj0.QuyChBOAwOio/AvoRTXjBxGmp4OS12uobAyTvy",
    avatar: null,
  }
})

test("should reject login with mandatory fields blank", () => {
  expect(async () => {
    await loginCreateService.execute({
      email: "",
      password: "",
    })
  }).rejects.toEqual(
    new ErrorResponse({
      statusCode: 400,
      status: "warning",
      message: "Por favor, preencha todos os campos obrigatórios",
    }),
  )
})

test("should reject login with invalid email", () => {
  expect(async () => {
    await loginCreateService.execute({
      email: john.email,
      password: "123",
    })
  }).rejects.toEqual(
    new ErrorResponse({
      statusCode: 401,
      status: "error",
      message: "E-mail ou senha inválido",
    }),
  )
})

test("should reject login with invalid password", () => {
  inMemoryUserRepository.users = [john]

  expect(async () => {
    await loginCreateService.execute({
      email: john.email,
      password: "321",
    })
  }).rejects.toEqual(
    new ErrorResponse({
      statusCode: 401,
      status: "error",
      message: "E-mail ou senha inválido",
    }),
  )
})

test("should return a user object and a token string", async () => {
  inMemoryUserRepository.users = [john]

  const { user, token } = await loginCreateService.execute({
    email: john.email,
    password: "123",
  })

  expect({ user, token }).toEqual({
    user: expect.any(Object),
    token: expect.any(String),
  })
})
