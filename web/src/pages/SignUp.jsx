import { displayStatusMessage } from "../utils/displayStatusMessage.js"
import { TextButton } from "../components/TextButton.jsx"
import { FiUser, FiMail, FiLock } from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import { api } from "../services/api.js"
import { useState } from "react"

export function SignUp() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  function handleSignUp() {
    setLoading(true)

    api
      .post("/user", {
        name,
        email,
        password,
      })
      .then((response) => {
        displayStatusMessage(response)
        navigate("/")
      })
      .catch((error) => {
        const statusMessage = displayStatusMessage(error.response)

        const isStatusError = statusMessage.status === "error"
        const isFieldEmail = statusMessage.field === "email"
        if (isStatusError && isFieldEmail) {
          setEmail("")
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
      handleSignUp()
    }
  }

  return (
    <div id="SignUp" className="flex h-full">
      <aside
        className="flex-1 bg-[url(../assets/background.png)] bg-cover bg-center bg-no-repeat opacity-20"
        aria-label="Imagem lateral"
      ></aside>

      <main className="px-[16rem] flex flex-col justify-center items-center gap-[5rem]">
        <div className="flex flex-col text-center">
          <h1 className="text-orange text-[4.8rem]/[6.3rem] font-bold">
            Rocket Notes
          </h1>

          <p className="text-gray-500 text-[1.4rem]/[1.8rem]">
            Aplicação para salvar e gerenciar seus links úteis.
          </p>
        </div>

        <form className="w-[34rem] mb-[3rem]">
          <fieldset className="w-full">
            <legend className="text-[2.4rem]/[3.2rem] font-medium text-white mb-[4.8rem] w-full text-center">
              Crie sua conta
            </legend>

            <div className="w-full flex flex-col gap-[0.8rem] mb-[2.4rem]">
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
                label="E-mail"
                type="email"
                placeholder="E-mail"
                value={email}
                onKeyDown={handleEnter}
                onChange={(event) => setEmail(event.target.value)}
              />
              <Input
                icon={FiLock}
                id="password"
                label="Senha"
                type="password"
                placeholder="Senha"
                value={password}
                onKeyDown={handleEnter}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <Button
              title="Cadastrar"
              loading={loading}
              onClick={handleSignUp}
            />
          </fieldset>
        </form>

        <TextButton title="Voltar para o login" isOrange onClick={handleBack} />
      </main>
    </div>
  )
}
