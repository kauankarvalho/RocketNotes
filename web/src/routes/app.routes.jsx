import { Routes, Route } from "react-router-dom"
import { Home } from "../pages/Home"
import { Profile } from "../pages/Profile"
import { NoteCreate } from "../pages/NoteCreate"
import { NotePreview } from "../pages/NotePreview"

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/new" element={<NoteCreate />} />
      <Route path="/details/:id" element={<NotePreview />} />
    </Routes>
  )
}
