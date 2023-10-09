import { Header } from "../components/Header"
import { Input } from "../components/Input"
import { Section } from "../components/Section"
import { NoteItem } from "../components/NoteItem"
import { Button } from "../components/Button"

export function NoteCreate() {
  return (
    <div id="NoteCreate" className="h-full">
      <Header />

      <main className="flex flex-col items-center pt-[4rem] pb-[10rem]">
        <form
          id="NoteForm"
          className="w-full max-w-[55rem] flex flex-col gap-[3.5rem]"
        >
          <header className="flex justify-between items-center">
            <h1 className="text-[3.6rem]/[4.7rem] text-white font-medium">
              Criar nota
            </h1>

            <a href="#" className="text-[2rem]/[2.6rem] text-gray-500">
              Voltar
            </a>
          </header>

          <fieldset className="flex flex-col gap-[1.6rem]">
            <Input id="title" type="text" placeholder="Título" required />

            <textarea
              id="description"
              placeholder="Observações"
              className="bg-gray-900 w-full outline-none rounded-[1rem] p-[1.5rem] text-[1.6rem]/[1.9rem] placeholder:text-gray-600 text-white h-[15rem] border-[0.2rem] border-transparent focus:border-orange resize-none text-justify"
            ></textarea>
          </fieldset>

          <fieldset className="flex flex-col gap-[5rem]">
            <Section title="Links úteis">
              <NoteItem link isNew />
            </Section>

            <Section title="Marcadores">
              <NoteItem tag isNew />
            </Section>
          </fieldset>
        </form>

        <div className="w-full max-w-[55rem]">
          <Button title="Savar" form="NoteForm" />
        </div>
      </main>
    </div>
  )
}
