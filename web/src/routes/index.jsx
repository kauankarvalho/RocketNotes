import { BrowserRouter } from "react-router-dom"
import { AuthRoutes } from "./auth.routes"
import { AppRoutes } from "./app.routes"
import { useAuth } from "../hooks/auth"

export function Routes() {
  const { user } = useAuth()

  const routesToRender = user ? <AppRoutes /> : <AuthRoutes />

  return <BrowserRouter>{routesToRender}</BrowserRouter>
}
