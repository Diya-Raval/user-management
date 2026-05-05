import { useEffect, useState } from 'react'
import { subscribeToast } from '../../utils/toast'

interface ToastItem {
  id: number
  message: string
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  useEffect(() => {
    return subscribeToast((message) => {
      const id = Date.now()
      setToasts((current) => [...current, { id, message }])
      window.setTimeout(() => {
        setToasts((current) => current.filter((toast) => toast.id !== id))
      }, 3000)
    })
  }, [])

  if (!toasts.length) return null

  return (
    <div className="fixed right-4 top-20 z-40 grid gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:border-rose-900 dark:bg-rose-950/60 dark:text-rose-200"
        >
          {toast.message}
        </div>
      ))}
    </div>
  )
}
