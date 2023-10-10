import React from "react"
import ReactDOM from "react-dom/client"
import { NotePreview } from "./pages/NotePreview"
import "./styles/global.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NotePreview />
  </React.StrictMode>,
)
