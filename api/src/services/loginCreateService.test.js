const InMemoryUserRepository = require("../repositories/InMemoryUserRepository")
const LoginCreateService = require("../services/LoginCreateService")
import { describe, beforeEach, test, expect } from "vitest"
const ErrorResponse = require("../utils/ErrorResponse")

describe("LoginCreateService", () => {
  let inMemoryUserRepository
  let loginCreateService

  let john

  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    loginCreateService = new LoginCreateService(inMemoryUserRepository)

    john = {
      id: "5d006fea-072e-46fc-b275-68139c23a0d5",
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
        email: john.email,
        password: "123",
      })
    }).rejects.toEqual(
      new ErrorResponse("error", "E-mail e/ou senha inválido", 401),
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
      new ErrorResponse("error", "E-mail e/ou senha inválido", 401),
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
})
