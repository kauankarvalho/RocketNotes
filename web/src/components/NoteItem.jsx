import { FiPlus, FiX } from "react-icons/fi"

export function NoteItem({ link, tag, isNew, id, value, onClick, ...rest }) {
  let icon
  let inputStyles
  let placeholder
  let width
  let type
  let label

  if (link) {
    type = "Link"
    width = "w-full"
    placeholder = "Novo link"
  }

  if (tag) {
    type = "marcador"
    width = "w-[48%]"
    placeholder = "Novo marcador"
  }

  if (isNew) {
    icon = <FiPlus className="w-[2rem] h-[2rem] text-orange" />
    inputStyles = "bg-transparent border-dashed border-gray-600"
    label = `Adicionar ${type}`
  } else {
    icon = <FiX className="w-[2rem] h-[2rem] text-red" />
    inputStyles = "bg-gray-900 border-transparent"
    label = `Remover ${type} ${value}`
  }

  return (
    <div className={`relative ${width}`}>
      <label
        htmlFor={id}
        className="absolute right-[1.5rem] top-[50%] translate-y-[-50%] w-[2rem] h-[2rem] hover-effect"
        role="button"
        tabIndex={0}
      >
        <span className="sr-only">{label}</span>

        <button type="button" onClick={onClick}>
          {icon}
        </button>
      </label>

      <input
        className={`outline-none rounded-[1rem] p-[1.5rem] pr-[5.2rem] text-[1.6rem]/[2.1rem] placeholder:text-gray-600 text-white border-[0.2rem] w-full ${inputStyles}`}
        id={id}
        readOnly={!isNew}
        value={value}
        placeholder={placeholder}
        {...rest}
      />
    </div>
  )
}
