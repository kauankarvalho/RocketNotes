import { useState } from "react"

export function Input({ icon: Icon, id, label, ...rest }) {
  const [iconColor, setIconColor] = useState("text-gray-600")

  const paddingLeftClass = Icon ? "pl-[5.2rem]" : "pl-[1.5rem]"

  function handleFocus() {
    setIconColor("text-orange")
  }

  function handleBlur() {
    setIconColor("text-gray-600")
  }

  return (
    <div className="relative w-full">
      {Icon && (
        <label
          htmlFor={id}
          className="absolute left-[1.6rem] top-[50%] translate-y-[-50%]"
        >
          <span className="sr-only">{label}</span>
          <Icon
            className={`h-[2rem] w-[2rem] ${iconColor} transition-all duration-[0.2s]`}
          />
        </label>
      )}

      <input
        className={`bg-gray-900 rounded-[1rem] w-full ${paddingLeftClass} pr-[1.5rem] py-[1.5rem] text-white text-[1.6rem]/[2.1rem] outline-none border-[0.2rem] focus:border-orange placeholder:text-gray-600 border-transparent transition-all duration-[0.2s]`}
        id={id}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...rest}
      />
    </div>
  )
}
