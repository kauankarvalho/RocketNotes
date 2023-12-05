export function TextButton({ title, isOrange, icon: Icon, label, onClick }) {
  const textColor = isOrange ? "text-orange" : "text-gray-500"

  return (
    <span
      type="button"
      className={`text-[1.6rem]/[2.1rem] cursor-pointer ${textColor} hover-effect`}
      role="button"
      aria-label={label}
      tabIndex={0}
      onClick={onClick}
    >
      {title}
      {Icon && <Icon className="w-[2.4rem] h-[2.4rem] text-gray-500" />}
    </span>
  )
}
