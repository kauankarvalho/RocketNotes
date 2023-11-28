import { FiArrowLeft, FiCamera, FiUser, FiMail, FiLock } from "react-icons/fi"
import { TextButton } from "../components/TextButton"
import avatarDefault from "../assets/avatar.svg"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import { useAuth } from "../hooks/auth"
import { api } from "../services/api"
import { useState } from "react"

export function Profile() {
  const { user, updateProfile } = useAuth()

  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [password, setPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")

  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  let avatarUrl = avatarDefault

  const userAvatarExists = user.avatar
  if (userAvatarExists) {
    avatarUrl = `${api.defaults.baseURL}/file/${user.avatar}`
  }

  const [avatar, setAvatar] = useState(avatarUrl)
  const [avatarFile, setAvatarFile] = useState(user.avatar)

  function handleChangeAvatar(event) {
    const file = event.target.files[0]
    setAvatarFile(file)

    const filePreview = URL.createObjectURL(file)
    setAvatar(filePreview)
  }

  function handleUpdate() {
    setLoading(true)
    updateProfile({ name, email, password, newPassword, avatarFile })
      .catch((error) => {
        const isStatusError = error.status === "error"

        const isEmailField = error.field === "email"
        if (isStatusError && isEmailField) {
          setEmail("")
        }

        const isPasswordField = error.field === "password"
        if (isStatusError && isPasswordField) {
          setPassword("")
        }
      })
      .finally(() => setLoading(false))
  }

  function handleBack() {
    navigate(-1)
  }

  function handleEnter(event) {
    const isEnterKey = event.key === "Enter"
    if (isEnterKey) {
      handleUpdate()
    }
  }

  return (
    <div id="profile" className="h-full">
      <header className="bg-gray-900 py-[5rem] px-[15rem] flex">
        <TextButton icon={FiArrowLeft} onClick={handleBack}></TextButton>
      </header>

      <main className="flex justify-center">
        <form className="w-full max-w-[34rem] flex flex-col items-center">
          <div className="relative w-[16.5rem] h-[16.5rem] mt-[-8rem] mb-[6.4rem]">
            <img
              src={avatar}
              alt={`Imagem de ${user.name}`}
              className="w-[16.5rem] h-[16.5rem] rounded-full"
            />

            <label
              htmlFor="avatar"
              className="bg-orange flex max-w-min p-[1.5rem] rounded-full absolute right-[0.4rem] bottom-[0.4rem] cursor-pointer hover-effect"
            >
              <FiCamera className="w-[2rem] h-[2rem] text-gray-800" />
              <input
                id="avatar"
                type="file"
                className="hidden"
                onChange={handleChangeAvatar}
              />
            </label>
          </div>

          <div className="flex flex-col gap-[2.4rem] w-full">
            <div className="flex flex-col gap-[0.8rem] w-full">
              <Input
                icon={FiUser}
                id="name"
                type="text"
                placeholder="Nome"
                value={name}
                onKeyDown={handleEnter}
                onChange={(event) => setName(event.target.value)}
              />
              <Input
                icon={FiMail}
                id="email"
                type="email"
                placeholder="Novo E-mail"
                value={email}
                onKeyDown={handleEnter}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div className="flex flex-col gap-[0.8rem] w-full">
              <Input
                icon={FiLock}
                id="password"
                type="password"
                placeholder="Senha atual"
                value={password}
                onKeyDown={handleEnter}
                onChange={(event) => setPassword(event.target.value)}
              />
              <Input
                icon={FiLock}
                id="newPassword"
                type="password"
                placeholder="Nova senha"
                value={newPassword}
                onKeyDown={handleEnter}
                onChange={(event) => setNewPassword(event.target.value)}
              />
            </div>
          </div>

          <Button title="Salvar" loading={loading} onClick={handleUpdate} />
        </form>
      </main>
    </div>
  )
}
