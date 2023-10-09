import React from "react"
import ReactDOM from "react-dom/client"
import { NoteCreate } from "./pages/NoteCreate"
import "./styles/global.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NoteCreate />
  </React.StrictMode>,
)
