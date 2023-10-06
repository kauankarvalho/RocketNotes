import { FiArrowLeft, FiCamera, FiUser, FiMail, FiLock } from "react-icons/fi"
import { Input } from "../components/Input"
import { Button } from "../components/Button"

export function Profile() {
  return (
    <div id="profile" className="h-full">
      <header className="bg-gray-900 py-[5rem] px-[15rem] flex">
        <a href="#">
          <FiArrowLeft className="w-[2.4rem] h-[2.4rem] text-gray-500" />
        </a>
      </header>

      <main className="flex justify-center">
        <form className="w-full max-w-[34rem] flex flex-col items-center">
          <div className="relative w-[16.5rem] h-[16.5rem] mt-[-8rem] mb-[6.4rem]">
            <img
              src="https://github.com/kauankarvalho.png"
              alt="Imagem de Kauan Carvalho"
              className="w-[16.5rem] h-[16.5rem] rounded-full"
            />

            <label
              htmlFor="avatar"
              className="bg-orange flex max-w-min p-[1.5rem] rounded-full absolute right-[0.4rem] bottom-[0.4rem] cursor-pointer"
            >
              <FiCamera className="w-[2rem] h-[2rem] text-gray-800" />
              <input id="avatar" type="file" className="hidden" />
            </label>
          </div>

          <div className="flex flex-col gap-[2.4rem] w-full">
            <div className="flex flex-col gap-[0.8rem] w-full">
              <Input
                icon={FiUser}
                id="name"
                type="text"
                placeholder="Nome"
                required
              />
              <Input
                icon={FiMail}
                id="email"
                type="email"
                placeholder="Novo E-mail"
                required
              />
            </div>

            <div className="flex flex-col gap-[0.8rem] w-full">
              <Input
                icon={FiLock}
                id="oldPassword"
                type="password"
                placeholder="Senha atual"
                required
              />
              <Input
                icon={FiLock}
                id="newPassword"
                type="password"
                placeholder="Nova senha"
                required
              />
            </div>
          </div>

          <Button title="Salvar" />
        </form>
      </main>
    </div>
  )
}
