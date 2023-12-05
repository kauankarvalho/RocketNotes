export function Note({ title, onClick, children }) {
  return (
    <div
      id="Note"
      className="bg-gray-700 w-full py-[1.6rem] px-[2.2rem] rounded-[1rem] flex flex-col gap-[2.4rem] cursor-pointer transition-all duration-[0.3s] hover:translate-y-[-0.5rem] hover:shadow-[-0.5rem_0.8rem_2rem_rgba(0,_0,_0,_0.2)]"
      role="button"
      aria-label={title}
      tabIndex={0}
      onClick={onClick}
    >
      <h1 className="text-[2.4rem]/[3.2rem] text-white font-bold">{title}</h1>

      <div className="flex gap-[0.6rem]">{children}</div>
    </div>
  )
}
