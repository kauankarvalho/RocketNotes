import { displayStatusMessage } from "../utils/displayStatusMessage"
import { TextButton } from "../components/TextButton"
import { NoteItem } from "../components/NoteItem"
import { Section } from "../components/Section"
import { useNavigate } from "react-router-dom"
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

  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  function handleAddLink() {
    const newLinkEmpty = newLink === ""
    if (newLinkEmpty) {
      return toast.warning("Por favor, insira um link")
    }

    const linkValidator = /^https?:\/\/[^/\s$?#.]+\.[^\s]*$/

    const invalidLink = !linkValidator.test(newLink)
    if (invalidLink) {
      return toast.warning("Link inválido")
    }

    const linkDuplicate = links.find((link) => link === newLink)
    if (linkDuplicate) {
      setNewLink("")
      return toast.warning("Este link já foi inserido")
    }

    setLinks((prevState) => [...prevState, newLink])
    setNewLink("")
  }

  function handleRemoveLink(deleted) {
    setLinks((prevState) => prevState.filter((link) => link !== deleted))
  }

  function handleAddTag() {
    const newTagEmpty = newTag === ""
    if (newTagEmpty) {
      return toast.warning("Por favor, insira um marcador")
    }

    const tagDuplicate = tags.find((tag) => tag === newTag)
    if (tagDuplicate) {
      setNewTag("")
      return toast.warning("Esta tag já foi inserida")
    }

    setTags((prevState) => [...prevState, newTag])
    setNewTag("")
  }

  function handleRemoveTag(deleted) {
    setTags((prevState) => prevState.filter((tag) => tag !== deleted))
  }

  function handleCreateNote() {
    const forgottenLink = newLink !== ""
    if (forgottenLink) {
      return toast.warning("Parece que você esqueceu de adicionar um link")
    }

    const forgottenTag = newTag !== ""
    if (forgottenTag) {
      return toast.warning("Parece que você esqueceu de adicionar um marcador")
    }

    setLoading(true)

    api
      .post("/note", {
        title,
        description,
        links,
        tags,
      })
      .then((response) => {
        displayStatusMessage(response)
        navigate("/")
      })
      .catch((error) => {
        displayStatusMessage(error.response)
      })
      .finally(() => setLoading(false))
  }

  function handleBack() {
    navigate(-1)
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

            <TextButton title="Voltar" onClick={handleBack} />
          </header>

          <fieldset className="flex flex-col gap-[1.6rem]">
            <legend className="sr-only">Título e Observações</legend>

            <Input
              id="title"
              label="Título"
              type="text"
              placeholder="Título"
              onChange={(event) => setTitle(event.target.value)}
            />

            <div>
              <label htmlFor="description" className="sr-only">
                Observações
              </label>
              <textarea
                id="description"
                placeholder="Observações"
                className="bg-gray-900 w-full outline-none rounded-[1rem] p-[1.5rem] text-[1.6rem]/[1.9rem] placeholder:text-gray-600 text-white h-[15rem] border-[0.2rem] border-transparent focus:border-orange resize-none text-justify transition-all duration-[0.2s]"
                onChange={(event) => setDescription(event.target.value)}
              ></textarea>
            </div>
          </fieldset>

          <fieldset className="flex flex-col gap-[5rem]">
            <legend className="sr-only">Links e Marcadores</legend>

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

        <div className="w-full max-w-[55rem] mt-[2.4rem]">
          <Button
            title="Salvar"
            form="noteForm"
            loading={loading}
            onClick={handleCreateNote}
          />
        </div>
      </main>
    </div>
  )
}
