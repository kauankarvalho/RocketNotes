import { FiArrowLeft, FiCamera, FiUser, FiMail, FiLock } from "react-icons/fi"
import { TextButton } from "../components/TextButton"
import avatarDefault from "../assets/avatar.svg"
import { FaUserAltSlash } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import { Modal } from "../components/Modal"
import { useAuth } from "../hooks/auth"
import { api } from "../services/api"
import { useState } from "react"

export function Profile() {
  const { user, updateProfile, deleteProfile } = useAuth()

  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [password, setPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")

  const [saveButtonLoading, setSaveButtonLoading] = useState(false)
  const [deleteButtonLoading, setDeleteButtonLoading] = useState(false)

  const [modalOpen, setModalOpen] = useState(false)

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
    setSaveButtonLoading(true)

    updateProfile({ name, email, password, newPassword, avatarFile })
      .then(() => {
        setPassword("")
        setNewPassword("")
      })
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

        const isAdminAccount = error.field === "admin"
        if (isStatusError && isAdminAccount) {
          setName(user.name)
          setEmail(user.email)
          setPassword("")
          setNewPassword("")
        }
      })
      .finally(() => setSaveButtonLoading(false))
  }

  function handleDelete() {
    setDeleteButtonLoading(true)

    deleteProfile(password)
      .catch(() => setPassword(""))
      .finally(() => setDeleteButtonLoading(false))

    setModalOpen(false)
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
        <TextButton
          icon={FiArrowLeft}
          label="Voltar"
          onClick={handleBack}
        ></TextButton>
      </header>

      <main className="flex justify-center">
        <form className="w-full max-w-[34rem]">
          <fieldset className="flex flex-col items-center">
            <legend className="sr-only">Atualize os dados da sua conta</legend>

            <div className="relative w-[16.5rem] h-[16.5rem] mt-[-8rem] mb-[6.4rem]">
              <img
                src={avatar}
                alt={`Imagem de ${user.name}`}
                className="w-[16.5rem] h-[16.5rem] rounded-full"
              />

              <label
                htmlFor="avatar"
                className="bg-orange flex max-w-min p-[1.5rem] rounded-full absolute right-[0.4rem] bottom-[0.4rem] cursor-pointer hover-effect"
                tabIndex={0}
              >
                <span className="sr-only">Adicionar uma foto de perfil</span>

                <FiCamera className="w-[2rem] h-[2rem] text-gray-800" />
                <input
                  id="avatar"
                  type="file"
                  className="hidden"
                  onChange={handleChangeAvatar}
                />
              </label>
            </div>

            <div className="flex flex-col gap-[2.4rem] w-full mb-[2.4rem]">
              <div className="flex flex-col gap-[0.8rem] w-full">
                <Input
                  icon={FiUser}
                  id="name"
                  label="Nome"
                  type="text"
                  placeholder="Nome"
                  value={name}
                  onKeyDown={handleEnter}
                  onChange={(event) => setName(event.target.value)}
                />
                <Input
                  icon={FiMail}
                  id="email"
                  label="Email"
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
                  label="Senha atual"
                  type="password"
                  placeholder="Senha atual"
                  value={password}
                  onKeyDown={handleEnter}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <Input
                  icon={FiLock}
                  id="newPassword"
                  label="Nova senha"
                  type="password"
                  placeholder="Nova senha"
                  value={newPassword}
                  onKeyDown={handleEnter}
                  onChange={(event) => setNewPassword(event.target.value)}
                />
              </div>
            </div>

            <div className="w-full flex flex-col gap-[1rem]">
              <Button
                title="Salvar"
                loading={saveButtonLoading}
                onClick={handleUpdate}
              />

              <Button
                title="Excluir conta"
                loading={deleteButtonLoading}
                isRed
                onClick={() => setModalOpen(true)}
              />
            </div>
          </fieldset>
        </form>
      </main>

      <Modal
        title="Quer excluir mesmo?"
        icon={FaUserAltSlash}
        buttonName="Excluir"
        handle={handleDelete}
        isOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
    </div>
  )
}
