import { TextButton } from "../components/TextButton"
import { FiMail, FiLock } from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import { useAuth } from "../hooks/auth"
import { useState } from "react"

export function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [loading, setLoading] = useState(false)

  const { signIn } = useAuth()

  const navigate = useNavigate()

  function handleSignIn() {
    setLoading(true)

    signIn({ email, password })
      .catch((error) => {
        const isStatusError = error.status === "error"
        if (isStatusError) {
          setEmail("")
          setPassword("")
        }
      })
      .finally(() => setLoading(false))
  }

  function handleEnter(event) {
    const isEnterKey = event.key === "Enter"
    if (isEnterKey) {
      handleSignIn()
    }
  }

  return (
    <div id="SignIn" className="flex h-full">
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
              Faça seu login
            </legend>

            <div className="w-full flex flex-col gap-[0.8rem] mb-[2.4rem]">
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

            <Button title="Entrar" loading={loading} onClick={handleSignIn} />
          </fieldset>
        </form>

        <TextButton
          title="Criar conta"
          isOrange
          onClick={() => navigate("/register")}
        />
      </main>

      <aside
        className="flex-1 bg-[url(../assets/background.png)] bg-cover bg-center bg-no-repeat opacity-20"
        aria-label="Imagem lateral"
      ></aside>
    </div>
  )
}
