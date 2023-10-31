import { createContext, useContext, useState } from "react"
import { api } from "../services/api"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [data, setData] = useState({})

  function signIn({ email, password }) {
    api
      .post("/login", {
        email,
        password,
      })
      .then((response) => {
        const { user, token } = response.data

        api.defaults.headers.authorization = `Bearer ${token}`
        setData({ user, token })
      })
      .catch((error) => {
        alert(error.response.data.message)
      })
  }

  return (
    <AuthContext.Provider value={{ signIn, user: data.user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
