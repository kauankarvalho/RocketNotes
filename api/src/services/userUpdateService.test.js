const InMemoryUserRepository = require("../repositories/InMemoryUserRepository")
const UserUpdateService = require("../services/UserUpdateService")
import { describe, beforeEach, test, expect } from "vitest"
const ErrorResponse = require("../utils/ErrorResponse")
const crypto = require("node:crypto")
const { hash } = require("bcryptjs")

describe("UserUpdateService", () => {
  let inMemoryUserRepository
  let userUpdateService

  let john

  beforeEach(async () => {
    inMemoryUserRepository = new InMemoryUserRepository()
    userUpdateService = new UserUpdateService(inMemoryUserRepository)

    john = {
      id: crypto.randomUUID(),
      name: "John",
      email: "john@email.com",
      password: await hash("1234", 8),
      avatar: null,
    }
    inMemoryUserRepository.users = [john]
  })

  test("should reject update user with empty name and email fields", () => {
    expect(async () => {
      await userUpdateService.execute({
        id: john.id,
        name: "",
        email: "",
        password: "1234",
        newPassword: "4321",
      })
    }).rejects.toEqual(
      new ErrorResponse({
        statusCode: 400,
        status: "warning",
        field: ["name", "email"],
        message: "Você precisa fornecer tanto um nome quanto um email",
      }),
    )
  })

  test("should reject update user with empty password field", () => {
    expect(async () => {
      await userUpdateService.execute({
        id: john.id,
        name: john.name,
        email: john.email,
        password: "",
        newPassword: "4321",
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

  test("should reject update user with invalid password", () => {
    expect(async () => {
      await userUpdateService.execute({
        id: john.id,
        name: john.name,
        email: john.email,
        password: "4321",
        newPassword: "4567",
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

  test("should reject login with email not valid", () => {
    expect(async () => {
      await userUpdateService.execute({
        id: john.id,
        name: john.name,
        email: "johnemail.com",
        password: "1234",
        newPassword: "",
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

  test("should reject update user with email already registered", async () => {
    const henry = {
      id: crypto.randomUUID(),
      name: "Henry",
      email: "henry@email.com",
      password: await hash("1234", 8),
      avatar: null,
    }
    inMemoryUserRepository.users = [henry, ...inMemoryUserRepository.users]

    expect(async () => {
      await userUpdateService.execute({
        id: henry.id,
        name: henry.name,
        email: john.email,
        password: "1234",
        newPassword: "",
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

  test("should update user information and verify changes", async () => {
    const newInformationsJohn = {
      name: "John Doe",
      email: "john.doe@email.com",
    }

    await userUpdateService.execute({
      id: john.id,
      name: newInformationsJohn.name,
      email: newInformationsJohn.email,
      password: "1234",
      newPassword: "",
    })

    const updatedUser = await inMemoryUserRepository.getUserById(john.id)

    expect(updatedUser.name).toEqual(newInformationsJohn.name)
    expect(updatedUser.email).toEqual(newInformationsJohn.email)
  })
})
