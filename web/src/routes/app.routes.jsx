import { NotePreview } from "../pages/NotePreview"
import { Routes, Route } from "react-router-dom"
import { NoteCreate } from "../pages/NoteCreate"
import { Profile } from "../pages/Profile"
import { Home } from "../pages/Home"

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
