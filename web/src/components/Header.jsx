import { RiShutDownLine } from "react-icons/ri"
import avatarDefault from "../assets/avatar.svg"
import { useAuth } from "../hooks/auth"
import { Link } from "react-router-dom"
import { api } from "../services/api"

export function Header() {
  const { user, signOut } = useAuth()

  let avatar = avatarDefault

  const userAvatarExists = user.avatar
  if (userAvatarExists) {
    avatar = `${api.defaults.baseURL}/file/${user.avatar}`
  }

  return (
    <header className="py-[2rem] px-[4rem] border-b-[0.1rem] border-gray-700 flex justify-between items-center sticky top-0 bg-gray-800 z-10">
      <div className="flex gap-[1rem]">
        <Link to="/profile">
          <img
            src={avatar}
            alt={`Imagem de ${user.name}`}
            className="w-[7rem] h-[7rem] rounded-full"
          />
        </Link>

        <div className="flex flex-col justify-center">
          <span className="text-[1.4rem]/[1.8rem] text-gray-500">
            Bem vindo,
          </span>

          <strong className="text-[1.8rem]/[2.4rem] text-white">
            {user.name}
          </strong>
        </div>
      </div>

      <RiShutDownLine
        className="w-[3.6rem] h-[3.6rem] text-gray-500 cursor-pointer"
        onClick={signOut}
      />
    </header>
  )
}
