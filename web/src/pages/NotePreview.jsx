import { Header } from "../components/Header"
import { TextButton } from "../components/TextButton"
import { Section } from "../components/Section"
import { Tag } from "../components/Tag"
import { Button } from "../components/Button"

export function NotePreview() {
  return (
    <div id="NotePreview">
      <Header />

      <main className="flex justify-center pt-[6.5rem] pb-[10rem]">
        <div className="flex flex-col w-full max-w-[55rem]">
          <div className="text-end">
            <TextButton title="Excluir a nota" isOrange />
          </div>

          <div className="flex flex-col gap-[1.6rem] text-white my-[6.5rem]">
            <h1 className="text-[3.6rem]/[4.7rem] font-medium"></h1>

            <p className="text-[1.6rem]/[1.9rem] text-justify"></p>
          </div>

          <div className="flex flex-col gap-[3rem] mb-[10.6rem]">
            <Section title="Links úteis">
              <ul className="text-white flex flex-col gap-[1.5rem]"></ul>
            </Section>

            <Section title="Marcadores">
              <div className="flex flex-wrap gap-[0.6rem]"></div>
            </Section>
          </div>

          <Button title="Voltar" />
        </div>
      </main>
    </div>
  )
}
