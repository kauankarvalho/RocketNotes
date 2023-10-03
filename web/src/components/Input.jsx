export function Input({ icon: Icon, id, ...rest }) {
  const paddingLeftClass = Icon ? "pl-[5.2rem]" : "pl-[1.5rem]"

  return (
    <div className="relative">
      {Icon && (
        <label
          htmlFor={id}
          className="absolute left-[1.6rem] top-[50%] translate-y-[-50%]"
        >
          <Icon className="h-[2rem] w-[2rem] text-gray-600" />
        </label>
      )}

      <input
        className={`bg-gray-900 rounded-[1rem] w-full ${paddingLeftClass} pr-[1.5rem] py-[1.5rem] text-gray-500 text-[1.6rem]/[2.1rem] outline-none border-[0.2rem] focus:border-orange placeholder:text-gray-600 border-transparent`}
        id={id}
        {...rest}
      />
    </div>
  )
}
