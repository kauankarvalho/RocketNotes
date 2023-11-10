import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
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
    <ToastContainer
      position="top-right"
      autoClose={3500}
      limit={3}
      hideProgressBar={true}
      newestOnTop={true}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable={false}
      pauseOnHover={false}
      theme="colored"
    />
  </React.StrictMode>,
)
