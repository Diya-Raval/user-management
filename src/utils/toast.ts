export type ToastType = 'success' | 'error'
type ToastListener = (message: string, type: ToastType) => void

const listeners = new Set<ToastListener>()

export function subscribeToast(listener: ToastListener) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function showErrorToast(message: string) {
  listeners.forEach((listener) => listener(message, 'error'))
}

export function showSuccessToast(message: string) {
  listeners.forEach((listener) => listener(message, 'success'))
}
