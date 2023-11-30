const InMemoryUserRepository = require("../repositories/InMemoryUserRepository")
const LoginCreateService = require("../services/LoginCreateService")
import { describe, beforeEach, test, expect } from "vitest"
const ErrorResponse = require("../utils/ErrorResponse")
const crypto = require("node:crypto")
const { hash } = require("bcryptjs")

describe("LoginCreateService", () => {
  let inMemoryUserRepository
  let loginCreateService

  let john

  beforeEach(async () => {
    inMemoryUserRepository = new InMemoryUserRepository()
    loginCreateService = new LoginCreateService(inMemoryUserRepository)

    john = {
      id: crypto.randomUUID(),
      name: "John",
      email: "john@email.com",
      password: await hash("1234", 8),
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

  test("should reject login with email not valid", () => {
    expect(async () => {
      await loginCreateService.execute({
        email: "johnemail.com",
        password: "1234",
      })
    }).rejects.toEqual(
      new ErrorResponse({
        statusCode: 400,
        status: "warning",
        field: "email",
        message: "Insira um e-mail válido",
      }),
    )
  })

  test("should reject login with invalid email", () => {
    expect(async () => {
      await loginCreateService.execute({
        email: john.email,
        password: "1234",
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
        password: "4321",
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
      password: "1234",
    })

    expect({ user, token }).toEqual({
      user: expect.any(Object),
      token: expect.any(String),
    })
  })
})
