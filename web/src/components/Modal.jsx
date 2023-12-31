import { MdOutlineCancelPresentation } from "react-icons/md"

export function Modal({
  title,
  icon: Icon,
  buttonName,
  handle,
  isOpen,
  setModalOpen,
}) {
  if (isOpen) {
    return (
      <div
        id="modal"
        className="bg-black/80 absolute top-0 left-0 w-full h-full z-50 flex justify-center items-center animate-bgModalOpen"
      >
        <div className="w-[48rem] h-[34rem] bg-gray-900 rounded-[0.5rem] flex flex-col justify-center items-center gap-[3rem] animate-modalOpen">
          <h2 className="text-[2.5rem] text-white font-bold">{title}</h2>

          <div className="flex gap-[1rem]">
            <button
              className="bg-orange w-[14rem] h-[16rem] flex flex-col justify-center items-center gap-[0.5rem] rounded-[0.5rem] hover-effect"
              onClick={() => setModalOpen(!isOpen)}
            >
              <MdOutlineCancelPresentation className="w-[3.5rem] h-[3.5rem] text-white" />
              <p className="text-[1.6rem] font-bold text-white">Noooo!</p>
            </button>

            <button
              className="bg-gray-950 w-[14rem] h-[16rem] flex flex-col justify-center items-center gap-[0.5rem] rounded-[0.5rem] hover-effect"
              onClick={handle}
            >
              <Icon className="w-[3.5rem] h-[3.5rem] text-white" />
              <p className="text-[1.6rem] font-bold text-white">{buttonName}</p>
            </button>
          </div>
        </div>
      </div>
    )
  }
}
