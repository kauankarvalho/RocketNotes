import { toast } from "react-toastify"

export function displayStatusMessage(response) {
  const isResponseUndefined = response === undefined
  if (isResponseUndefined) {
    toast.error("O servidor não está respondendo")
  }

  switch (response.data.status) {
    case "success":
      toast.success(response.data.message)

      return { status: response.data.status }
    case "warning":
      toast.warning(response.data.message)

      return {
        status: response.data.status,
        field: response.data.field,
      }
    case "error":
      toast.error(response.data.message)

      return {
        status: response.data.status,
        field: response.data.field,
      }
  }
}
