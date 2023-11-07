export function Note({ title, children }) {
  return (
    <div
      id="Note"
      className="bg-gray-700 w-full py-[1.6rem] px-[2.2rem] rounded-[1rem] flex flex-col gap-[2.4rem] cursor-pointer"
    >
      <h1 className="text-[2.4rem]/[3.2rem] text-white font-bold">{title}</h1>

      <div className="flex gap-[0.6rem]">{children}</div>
    </div>
  )
}
