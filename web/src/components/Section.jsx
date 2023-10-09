export function Section({ title, children }) {
  return (
    <div className="flex gap-[2rem] flex-wrap justify-between">
      <h2 className="text-[2rem]/[2.6rem] text-gray-500 pb-[1.6rem] border-b-[0.1rem] border-gray-700 mb-[0.5rem] w-full">
        {title}
      </h2>
      {children}
    </div>
  )
}
