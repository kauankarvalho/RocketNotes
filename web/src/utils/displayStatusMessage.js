import { toast } from "react-toastify"

export function displayStatusMessage(response) {
  const isResponseUndefined = response === undefined
  if (isResponseUndefined) {
    toast.error("O servidor não está respondendo")
  }

  switch (response.data.status) {
    case "success":
      toast.success(response.data.message)
      break
    case "warning":
      toast.warning(response.data.message)
      break
    case "error":
      toast.error(response.data.message)
      break
  }
}
