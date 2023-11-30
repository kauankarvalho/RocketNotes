const InMemoryUserRepository = require("../repositories/InMemoryUserRepository")
const UserCreateService = require("../services/UserCreateService")
import { describe, beforeEach, test, expect } from "vitest"
const ErrorResponse = require("../utils/ErrorResponse")
const crypto = require("node:crypto")
const { hash } = require("bcryptjs")

describe("UserCreateService", () => {
  let inMemoryUserRepository
  let userCreateService

  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    userCreateService = new UserCreateService(inMemoryUserRepository)
  })

  test("should reject user create with mandatory fields blank", () => {
    expect(async () => {
      await userCreateService.execute({
        name: "",
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
      await userCreateService.execute({
        name: "John",
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

  test("should reject user create with email already registered", async () => {
    const john = {
      id: crypto.randomUUID(),
      name: "John",
      email: "john@email.com",
      password: await hash("1234", 8),
      avatar: null,
    }

    inMemoryUserRepository.users = [john]

    expect(async () => {
      await userCreateService.execute({
        name: john.name,
        email: john.email,
        password: "1234",
      })
    }).rejects.toEqual(
      new ErrorResponse({
        statusCode: 409,
        status: "error",
        field: "email",
        message: "E-mail já cadastrado",
      }),
    )
  })

  test("should create a user and retrieve it from the database", async () => {
    const newUser = {
      name: "John",
      email: "john@email.com",
      password: "1234",
    }

    await userCreateService.execute(newUser)

    const retrievedUser = await inMemoryUserRepository.getUserByEmail(
      newUser.email,
    )

    expect(retrievedUser.email).toEqual(newUser.email)
  })
})
