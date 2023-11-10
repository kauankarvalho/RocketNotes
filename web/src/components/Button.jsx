export function Button({ title, onClick, ...rest }) {
  return (
    <button
      className="bg-orange rounded-[1rem] p-[1.6rem] text-[1.6rem]/[2.1rem] font-medium text-gray-800 w-full mt-[2.4rem]"
      type="button"
      onClick={onClick}
      {...rest}
    >
      {title}
    </button>
  )
}
