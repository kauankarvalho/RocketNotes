import { displayStatusMessage } from "../utils/displayStatusMessage"
import { useParams, useNavigate } from "react-router-dom"
import { TextButton } from "../components/TextButton"
import { Section } from "../components/Section"
import { Header } from "../components/Header"
import { Button } from "../components/Button"
import { useEffect, useState } from "react"
import { TbNotesOff } from "react-icons/tb"
import { Modal } from "../components/Modal"
import { Tag } from "../components/Tag"
import { api } from "../services/api"

export function NotePreview() {
  const [modalOpen, setModalOpen] = useState(false)
  const [note, setNote] = useState(null)

  const { id } = useParams()

  const navigate = useNavigate()

  function handleDelete() {
    api.delete(`/note/${id}`).then((response) => {
      displayStatusMessage(response)
      navigate("/")
    })
  }

  function handleBack() {
    navigate(-1)
  }

  useEffect(() => {
    api
      .get(`/note/${id}`)
      .then((response) => setNote(response.data.note))
      .catch((error) => {
        displayStatusMessage(error.response)
        navigate("/")
      })
  }, [])

  return (
    <div id="NotePreview" className="h-full grid grid-rows-[auto,_1fr]">
      <Header />

      {note && (
        <main className="flex flex-col items-center pt-[6.5rem] pb-[10rem] overflow-auto">
          <div className="flex flex-col w-full max-w-[55rem]">
            <div className="text-end">
              <TextButton
                title="Excluir a nota"
                isOrange
                onClick={() => setModalOpen(!modalOpen)}
              />
            </div>

            <div className="flex flex-col gap-[1.6rem] text-white my-[6.5rem]">
              <h1 className="text-[3.6rem]/[4.7rem] font-medium">
                {note.title}
              </h1>

              <p className="text-[1.6rem]/[1.9rem] text-justify">
                {note.description}
              </p>
            </div>

            <div className="flex flex-col gap-[3rem] mb-[10.6rem]">
              {note.links.length > 0 && (
                <Section title="Links úteis">
                  <ul className="text-white flex flex-col gap-[1.5rem]">
                    {note.links.map((link, index) => (
                      <li key={String(index)}>
                        <a
                          className="text-white text-[1.6rem]/[1.9rem] cursor-pointer hover:underline hover-effect"
                          href={link}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </Section>
              )}

              {note.tags.length > 0 && (
                <Section title="Marcadores">
                  <div className="flex flex-wrap gap-[0.6rem]">
                    {note.tags.map((tag, index) => (
                      <Tag key={String(index)} title={tag} />
                    ))}
                  </div>
                </Section>
              )}
            </div>

            <Button title="Voltar" onClick={handleBack} />
          </div>
        </main>
      )}

      <Modal
        title={"Quer mesmo excluir?"}
        icon={TbNotesOff}
        buttonName={"Excluir"}
        handle={handleDelete}
        isOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
    </div>
  )
}
