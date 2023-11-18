const InMemoryUserRepository = require("../repositories/InMemoryUserRepository")
const UserUpdateService = require("../services/UserUpdateService")
import { describe, beforeEach, test, expect } from "vitest"
const ErrorResponse = require("../utils/ErrorResponse")

describe("UserUpdateService", () => {
  let inMemoryUserRepository
  let userUpdateService

  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    userUpdateService = new UserUpdateService(inMemoryUserRepository)
  })

  test("should reject update user with empty name and email fields", () => {
    expect(async () => {
      await userUpdateService.execute({
        id: "5d006fea-072e-46fc-b275-68139c23a0d5",
        name: "",
        email: "",
        password: "123",
        newPassword: "321",
      })
    }).rejects.toEqual(
      new ErrorResponse(
        "warning",
        "Você precisa fornecer tanto um nome quanto um email",
        400,
      ),
    )
  })

  test("should reject update user with empty password field", () => {
    expect(async () => {
      await userUpdateService.execute({
        id: "5d006fea-072e-46fc-b275-68139c23a0d5",
        name: "Henry",
        email: "henry@email.com",
        password: "",
        newPassword: "321",
      })
    }).rejects.toEqual(
      new ErrorResponse("warning", "Por favor, insira sua senha", 400),
    )
  })

  test("should reject update user with invalid password", () => {
    expect(async () => {
      await userUpdateService.execute({
        id: "5d006fea-072e-46fc-b275-68139c23a0d5",
        name: "Henry",
        email: "henry@email.com",
        password: "321",
        newPassword: "456",
      })
    }).rejects.toEqual(new ErrorResponse("error", "Senha inválida", 401))
  })

  test("should reject update user with email already registered", () => {
    expect(async () => {
      await userUpdateService.execute({
        id: "5d006fea-072e-46fc-b275-68139c23a0d5",
        name: "Henry",
        email: "james@email.com",
        password: "123",
        newPassword: "",
      })
    }).rejects.toEqual(new ErrorResponse("error", "E-mail já cadastrado", 409))
  })

  test("should update user information and verify changes", async () => {
    const updatedUserInfo = {
      id: "5d006fea-072e-46fc-b275-68139c23a0d5",
      name: "Henry Doe",
      email: "henry.doe@email.com",
      password: "123",
      newPassword: "",
    }

    await userUpdateService.execute(updatedUserInfo)

    const updatedUser = await inMemoryUserRepository.getUserById(
      updatedUserInfo.id,
    )

    expect(updatedUser.name).toEqual(updatedUserInfo.name)
    expect(updatedUser.email).toEqual(updatedUserInfo.email)
  })
})
