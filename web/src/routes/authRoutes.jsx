import { Routes, Route, Navigate } from "react-router-dom"
import { SignIn } from "../pages/SignIn"
import { SignUp } from "../pages/SignUp"

export function AuthRoutes() {
  const user = localStorage.getItem("@rocketnotes:user")
  const isUserNotExist = !user

  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
      {isUserNotExist && <Route path="*" element={<Navigate to="/" />} />}
    </Routes>
  )
}
