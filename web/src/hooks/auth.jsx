import { createContext, useContext, useState, useEffect } from "react"
import { displayStatusMessage } from "../utils/displayStatusMessage"
import { api } from "../services/api"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [data, setData] = useState({})

  async function signIn({ email, password }) {
    return api
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
        displayStatusMessage(error.response)
      })
  }

  async function updateProfile({
    name,
    email,
    password,
    newPassword,
    avatarFile,
  }) {
    const isAvatarFileExist = avatarFile
    const isAvatarFileObject = typeof avatarFile === "object"

    if (isAvatarFileExist && isAvatarFileObject) {
      const fileUploadForm = new FormData()
      fileUploadForm.append("avatar", avatarFile)

      const response = await api.patch("/user/avatar", fileUploadForm)
      avatarFile = response.data.avatar
    }

    return api
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
          avatar: avatarFile,
        }

        localStorage.setItem("@rocketnotes:user", JSON.stringify(user))
        setData({ user })

        displayStatusMessage(response)
      })
      .catch((error) => {
        displayStatusMessage(error.response)
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
