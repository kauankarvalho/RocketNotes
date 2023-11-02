import { AuthProvider } from "./hooks/auth"
import ReactDOM from "react-dom/client"
import { Routes } from "./routes"
import "./styles/global.css"
import React from "react"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <Routes />
    </AuthProvider>
  </React.StrictMode>,
)
