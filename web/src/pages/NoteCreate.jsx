import { Link, useNavigate } from "react-router-dom"
import { NoteItem } from "../components/NoteItem"
import { Section } from "../components/Section"
import { Header } from "../components/Header"
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import { toast } from "react-toastify"
import { api } from "../services/api"
import { useState } from "react"

export function NoteCreate() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const [links, setLinks] = useState([])
  const [newLink, setNewLink] = useState("")

  const [tags, setTags] = useState([])
  const [newTag, setNewTag] = useState("")

  const navigate = useNavigate()

  function handleAddLink() {
    setLinks((prevState) => [...prevState, newLink])
    setNewLink("")
  }

  function handleRemoveLink(deleted) {
    setLinks((prevState) => prevState.filter((link) => link !== deleted))
  }

  function handleAddTag() {
    setTags((prevState) => [...prevState, newTag])
    setNewTag("")
  }

  function handleRemoveTag(deleted) {
    setTags((prevState) => prevState.filter((tag) => tag !== deleted))
  }

  function handleCreateNote() {
    api
      .post("/note", {
        title,
        description,
        links,
        tags,
      })
      .then((response) => {
        toast.success(response.data.message)
        navigate("/")
      })
      .catch((error) => {
        if (error.response.data.status === "warning") {
          toast.warning(error.response.data.message)
        }
      })
  }

  return (
    <div id="NoteCreate" className="h-full grid grid-rows-[auto,_1fr]">
      <Header />

      <main className="flex flex-col items-center pt-[4rem] pb-[10rem] overflow-y-auto">
        <form
          id="noteForm"
          className="w-full max-w-[55rem] flex flex-col gap-[3.5rem]"
        >
          <header className="flex justify-between items-center">
            <h1 className="text-[3.6rem]/[4.7rem] text-white font-medium">
              Criar nota
            </h1>

            <Link to="/" className="text-[2rem]/[2.6rem] text-gray-500">
              Voltar
            </Link>
          </header>

          <fieldset className="flex flex-col gap-[1.6rem]">
            <Input
              id="title"
              type="text"
              placeholder="Título"
              onChange={(event) => setTitle(event.target.value)}
            />

            <textarea
              id="description"
              placeholder="Observações"
              className="bg-gray-900 w-full outline-none rounded-[1rem] p-[1.5rem] text-[1.6rem]/[1.9rem] placeholder:text-gray-600 text-white h-[15rem] border-[0.2rem] border-transparent focus:border-orange resize-none text-justify"
              onChange={(event) => setDescription(event.target.value)}
            ></textarea>
          </fieldset>

          <fieldset className="flex flex-col gap-[5rem]">
            <Section title="Links úteis">
              {links.map((link, index) => (
                <NoteItem
                  key={String(index)}
                  link
                  value={link}
                  onClick={() => handleRemoveLink(link)}
                />
              ))}

              <NoteItem
                link
                isNew
                value={newLink}
                onClick={handleAddLink}
                onChange={(event) => setNewLink(event.target.value)}
              />
            </Section>

            <Section title="Marcadores">
              {tags.map((tag, index) => (
                <NoteItem
                  key={String(index)}
                  tag
                  value={tag}
                  onClick={() => handleRemoveTag(tag)}
                />
              ))}

              <NoteItem
                tag
                isNew
                value={newTag}
                onClick={handleAddTag}
                onChange={(event) => setNewTag(event.target.value)}
              />
            </Section>
          </fieldset>
        </form>

        <div className="w-full max-w-[55rem]">
          <Button title="Salvar" form="noteForm" onClick={handleCreateNote} />
        </div>
      </main>
    </div>
  )
}
