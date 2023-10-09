export function TextButton({ title, isOrange }) {
  const textColor = isOrange ? "text-orange" : "text-gray-500"

  return (
    <span
      type="button"
      className={`text-[1.6rem]/[2.1rem] cursor-pointer ${textColor}`}
    >
      {title}
    </span>
  )
}
