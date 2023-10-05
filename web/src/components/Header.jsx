import { RiShutDownLine } from "react-icons/ri"

export function Header() {
  return (
    <header className="py-[2rem] px-[4rem] border-b-[0.1rem] border-gray-700 flex justify-between items-center">
      <div className="flex gap-[1rem]">
        <img
          src="https://github.com/kauankarvalho.png"
          alt="Imagem de Kauan Carvalho"
          className="w-[7rem] h-[7rem] rounded-full"
        />

        <div className="flex flex-col justify-center">
          <span className="text-[1.4rem]/[1.8rem] text-gray-500">
            Bem vindo,
          </span>

          <strong className="text-[1.8rem]/[2.4rem] text-white">
            Kauan Carvalho
          </strong>
        </div>
      </div>

      <RiShutDownLine className="w-[3.6rem] h-[3.6rem] text-gray-500 cursor-pointer" />
    </header>
  )
}
