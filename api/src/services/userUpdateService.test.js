const InMemoryUserRepository = require("../repositories/InMemoryUserRepository")
const UserUpdateService = require("../services/UserUpdateService")
const ErrorResponse = require("../utils/ErrorResponse")
import { beforeEach, test, expect } from "vitest"
const crypto = require("node:crypto")

let inMemoryUserRepository
let userUpdateService
let john

beforeEach(() => {
  inMemoryUserRepository = new InMemoryUserRepository()
  userUpdateService = new UserUpdateService(inMemoryUserRepository)

  john = {
    id: crypto.randomUUID(),
    name: "John",
    email: "john@email.com",
    password: "$2a$08$hiUvBe9tESYEj0.QuyChBOAwOio/AvoRTXjBxGmp4OS12uobAyTvy",
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
      id: john.id,
      name: john.name,
      email: john.email,
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
      id: john.id,
      name: john.name,
      email: john.email,
      password: "321",
      newPassword: "456",
    })
  }).rejects.toEqual(new ErrorResponse("error", "Senha inválida", 401))
})

test("should reject update user with email already registered", () => {
  const henry = {
    id: crypto.randomUUID(),
    name: "Henry",
    email: "henry@email.com",
    password: "$2a$08$hiUvBe9tESYEj0.QuyChBOAwOio/AvoRTXjBxGmp4OS12uobAyTvy",
    avatar: null,
  }
  inMemoryUserRepository.users = [henry, ...inMemoryUserRepository.users]

  expect(async () => {
    await userUpdateService.execute({
      id: henry.id,
      name: henry.name,
      email: john.email,
      password: "123",
      newPassword: "",
    })
  }).rejects.toEqual(new ErrorResponse("error", "E-mail já cadastrado", 409))
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
    password: "123",
    newPassword: "",
  })

  const updatedUser = await inMemoryUserRepository.getUserById(john.id)

  expect(updatedUser.name).toEqual(newInformationsJohn.name)
  expect(updatedUser.email).toEqual(newInformationsJohn.email)
})
