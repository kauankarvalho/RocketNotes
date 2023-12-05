export function Tag({ title }) {
  return (
    <span
      className="bg-orange py-[0.5rem] px-[1.5rem] text-[1.2rem]/[1.5rem] text-gray-900 rounded-[0.5rem]"
      aria-label="Marcador"
    >
      {title}
    </span>
  )
}
