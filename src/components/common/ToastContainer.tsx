import { useEffect, useState } from 'react'
import { subscribeToast, type ToastType } from '../../utils/toast'
import { CheckCircle, WarningCircle, X } from '@phosphor-icons/react'

interface ToastItem {
  id: number
  message: string
  type: ToastType
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  useEffect(() => {
    return subscribeToast((message, type) => {
      const id = Date.now()
      setToasts((current) => [...current, { id, message, type }])
      window.setTimeout(() => {
        setToasts((current) => current.filter((toast) => toast.id !== id))
      }, 3000)
    })
  }, [])

  if (!toasts.length) return null

  const removeToast = (id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }

  return (
    <div className="fixed right-4 top-20 z-[60] flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => {
        const isError = toast.type === 'error'
        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-xl border p-4 shadow-xl transition-all duration-300 animate-slide-in ${
              isError
                ? 'border-rose-200 bg-white text-slate-800 shadow-rose-500/10 dark:border-rose-900/50 dark:bg-slate-900 dark:text-slate-200'
                : 'border-emerald-200 bg-white text-slate-800 shadow-emerald-500/10 dark:border-emerald-900/50 dark:bg-slate-900 dark:text-slate-200'
            }`}
          >
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                isError ? 'bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400' : 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400'
              }`}
            >
              {isError ? <WarningCircle size={24} weight="fill" /> : <CheckCircle size={24} weight="fill" />}
            </div>
            
            <p className="text-sm font-medium leading-relaxed flex-1">
              {toast.message}
            </p>

            <button
              onClick={() => removeToast(toast.id)}
              className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300 transition-colors"
              aria-label="Close"
            >
              <X size={18} weight="bold" />
            </button>
          </div>
        )
      })}
    </div>
  )
}
