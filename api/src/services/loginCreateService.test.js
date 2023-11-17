const InMemoryUserRepository = require("../repositories/InMemoryUserRepository")
const LoginCreateService = require("../services/LoginCreateService")
import { describe, beforeEach, test, expect } from "vitest"
const ErrorResponse = require("../utils/ErrorResponse")

describe("LoginCreateService", () => {
  let inMemoryUserRepository
  let loginCreateService

  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    loginCreateService = new LoginCreateService(inMemoryUserRepository)
  })

  test("should reject login with mandatory fields blank", () => {
    expect(async () => {
      await loginCreateService.execute({
        email: "",
        password: "",
      })
    }).rejects.toEqual(
      new ErrorResponse(
        "warning",
        "Por favor, preencha todos os campos obrigatórios",
        400,
      ),
    )
  })

  test("should reject login with invalid email", () => {
    expect(async () => {
      await loginCreateService.execute({
        email: "john@email.com",
        password: "123",
      })
    }).rejects.toEqual(
      new ErrorResponse("error", "E-mail e/ou senha inválido", 401),
    )
  })

  test("should reject login with invalid password", () => {
    expect(async () => {
      await loginCreateService.execute({
        email: "henry@email.com",
        password: "321",
      })
    }).rejects.toEqual(
      new ErrorResponse("error", "E-mail e/ou senha inválido", 401),
    )
  })

  test("should return a user object and a token string", async () => {
    const { user, token } = await loginCreateService.execute({
      email: "henry@email.com",
      password: "123",
    })

    expect({ user, token }).toEqual({
      user: expect.any(Object),
      token: expect.any(String),
    })
  })
})
