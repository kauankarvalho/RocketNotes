export function TextButton({ title, isOrange, onClick }) {
  const textColor = isOrange ? "text-orange" : "text-gray-500"

  return (
    <span
      type="button"
      className={`text-[1.6rem]/[2.1rem] cursor-pointer ${textColor}`}
      onClick={onClick}
    >
      {title}
    </span>
  )
}
