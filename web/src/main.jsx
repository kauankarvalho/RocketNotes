import React from "react"
import ReactDOM from "react-dom/client"
import { AuthProvider } from "./hooks/auth"
import { Routes } from "./routes"
import "./styles/global.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <Routes />
    </AuthProvider>
  </React.StrictMode>,
)
