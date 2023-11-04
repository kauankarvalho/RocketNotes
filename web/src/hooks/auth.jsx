import { createContext, useContext, useState, useEffect } from "react"
import { api } from "../services/api"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [data, setData] = useState({})
  const [avatar, setAvatar] = useState(null)

  function signIn({ email, password }) {
    api
      .post("/login", {
        email,
        password,
      })
      .then((response) => {
        const { user, token } = response.data

        api.defaults.headers.common["Authorization"] = `Bearer ${token}`

        localStorage.setItem("@rocketnotes:user", JSON.stringify(user))
        localStorage.setItem("@rocketnotes:token", token)

        setData({ user, token })
      })
      .catch((error) => {
        alert(error.response.data.message)
      })
  }

  function updateProfile({ name, email, password, newPassword, avatarFile }) {
    const avatarFileExists = avatarFile
    if (avatarFileExists) {
      const fileUploadForm = new FormData()
      fileUploadForm.append("avatar", avatarFile)

      api.patch("/user/avatar", fileUploadForm).then((response) => {
        setAvatar(response.data.avatar)
      })
    }

    api
      .put("/user", {
        name,
        email,
        password,
        newPassword,
      })
      .then((response) => {
        const user = {
          name,
          email,
          avatar,
        }

        localStorage.setItem("@rocketnotes:user", JSON.stringify(user))
        setData({ user })

        alert(response.data.message)
      })
      .catch((error) => {
        alert(error.response.data.message)
      })
  }

  function signOut() {
    localStorage.clear()
    setData({})
  }

  useEffect(() => {
    const user = localStorage.getItem("@rocketnotes:user")
    const token = localStorage.getItem("@rocketnotes:token")

    const userAndTokenExists = user && token
    if (userAndTokenExists) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`

      setData({
        user: JSON.parse(user),
        token,
      })
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        signIn,
        updateProfile,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
