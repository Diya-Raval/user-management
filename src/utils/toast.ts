type ToastListener = (message: string) => void

const listeners = new Set<ToastListener>()

export function subscribeToast(listener: ToastListener) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function showErrorToast(message: string) {
  listeners.forEach((listener) => listener(message))
}
