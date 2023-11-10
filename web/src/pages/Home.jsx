import { TextButton } from "../components/TextButton"
import { Link, useNavigate } from "react-router-dom"
import { FiSearch, FiPlus } from "react-icons/fi"
import { Section } from "../components/Section"
import { Header } from "../components/Header"
import { Input } from "../components/Input"
import { useEffect, useState } from "react"
import { Note } from "../components/Note"
import { Tag } from "../components/Tag"
import { api } from "../services/api"

export function Home() {
  const [search, setSearch] = useState("")
  const [notes, setNotes] = useState([])

  const [tags, setTags] = useState([])
  const [tagSelected, setTagSelected] = useState("")

  const navigate = useNavigate()

  function handleTagSelected(tag) {
    setTagSelected(tag)
  }

  function handleDetails(id) {
    navigate(`/details/${id}`)
  }

  useEffect(() => {
    api
      .get(`/note?title=${search}&tag=${tagSelected}`)
      .then((response) => setNotes(response.data.notes))
  }, [search, tagSelected])

  useEffect(() => {
    api.get("/tag").then((response) => setTags(response.data.tags))
  }, [])

  return (
    <div
      id="home"
      className="grid grid-cols-[25rem,_1fr] grid-rows-[11.09rem,_1fr] h-full"
    >
      <aside className="row-span-2 grid grid-rows-[11.09rem,_1fr_auto] bg-gray-900">
        <header className="border-b-[0.1rem] border-gray-700 flex justify-center items-center">
          <h1 className="text-[2.4rem]/[3.2rem] text-orange font-bold">
            Rocketnotes
          </h1>
        </header>

        <ul className="p-[6.4rem] flex flex-col gap-[2.4rem] text-center overflow-y-auto">
          <li>
            <TextButton
              title="Todos"
              isOrange={tagSelected === ""}
              onClick={() => handleTagSelected("")}
            />
          </li>

          {tags.map((tag, index) => (
            <li key={String(index)}>
              <TextButton
                title={tag}
                isOrange={tagSelected === tag}
                onClick={() => handleTagSelected(tag)}
              />
            </li>
          ))}
        </ul>

        <footer>
          <Link
            to="/new"
            className="bg-orange py-[2.8rem] flex justify-center text-[2rem]/[2.6rem] gap-[0.8rem] items-center text-gray-900"
          >
            <FiPlus className="w-[2.2rem] h-full" />
            Criar nota
          </Link>
        </footer>
      </aside>

      <Header />

      <main className="p-[6.4rem] flex flex-col gap-[6.4rem] overflow-y-auto">
        <Input
          icon={FiSearch}
          id="search"
          type="search"
          placeholder="Pesquisar pelo título"
          onChange={(event) => setSearch(event.target.value)}
        />

        <Section title="Minhas notas">
          {notes.map((note, index) => (
            <Note
              key={String(index)}
              title={note.title}
              onClick={() => handleDetails(note.id)}
            >
              {note.tags.map((tag, index) => (
                <Tag key={String(index)} title={tag} />
              ))}
            </Note>
          ))}
        </Section>
      </main>
    </div>
  )
}
