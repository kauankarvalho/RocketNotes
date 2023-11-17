const InMemoryUserRepository = require("../repositories/InMemoryUserRepository")
const UserCreateService = require("../services/UserCreateService")
import { describe, beforeEach, test, expect } from "vitest"
const ErrorResponse = require("../utils/ErrorResponse")

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
      new ErrorResponse(
        "warning",
        "Por favor, preencha todos os campos obrigatórios",
        400,
      ),
    )
  })

  test("should reject user create with email already registered", () => {
    expect(async () => {
      await userCreateService.execute({
        name: "Henry",
        email: "henry@email.com",
        password: "123",
      })
    }).rejects.toEqual(new ErrorResponse("error", "E-mail já cadastrado", 409))
  })

  test("should create a user and retrieve it from the database", async () => {
    const newUser = {
      name: "John",
      email: "john@email.com",
      password: "123",
    }

    await userCreateService.execute(newUser)

    const retrievedUser = await inMemoryUserRepository.getUserByEmail(
      newUser.email,
    )
    
    expect(retrievedUser.email).toEqual(newUser.email)
  })
})
