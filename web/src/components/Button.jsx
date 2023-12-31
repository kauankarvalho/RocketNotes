import { CgSpinner } from "react-icons/cg"

export function Button({ title, isRed, loading, onClick, ...rest }) {
  const icon = (
    <CgSpinner className="w-[2.1rem] h-[2.1rem] animate-spin text-gray-800" />
  )

  const iconOrTitle = loading ? icon : title

  const buttonColor = isRed ? "bg-red" : "bg-orange"

  return (
    <button
      className={`${buttonColor} flex justify-center rounded-[1rem] p-[1.4rem] text-[1.6rem]/[2.1rem] font-medium text-gray-800 w-full disabled:opacity-50 disabled:cursor-no-drop hover-effect`}
      type="button"
      disabled={loading}
      onClick={onClick}
      {...rest}
    >
      {iconOrTitle}
    </button>
  )
}
