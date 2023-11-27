import { FiMail, FiLock } from "react-icons/fi"
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import { Link } from "react-router-dom"
import { useAuth } from "../hooks/auth"
import { useState } from "react"

export function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [loading, setLoading] = useState(false)

  const { signIn } = useAuth()

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

        <form className="w-[34rem]">
          <fieldset className="w-full">
            <legend className="text-[2.4rem]/[3.2rem] font-medium text-white mb-[4.8rem] w-full text-center">
              Faça seu login
            </legend>

            <div className="w-full flex flex-col gap-[0.8rem]">
              <Input
                icon={FiMail}
                id="email"
                type="email"
                placeholder="E-mail"
                value={email}
                onKeyDown={handleEnter}
                onChange={(event) => setEmail(event.target.value)}
              />
              <Input
                icon={FiLock}
                id="password"
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

        <Link
          to="/register"
          className="text-orange text-[1.6rem]/[2.1rem] mt-[3rem] hover-effect"
        >
          Criar conta
        </Link>
      </main>

      <aside className="flex-1 bg-[url(../assets/background.png)] bg-cover bg-center bg-no-repeat opacity-20"></aside>
    </div>
  )
}
