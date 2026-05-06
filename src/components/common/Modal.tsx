import type { PropsWithChildren } from 'react'
import { Button } from './Button'
import { X } from '@phosphor-icons/react'

interface ModalProps {
  title: string
  open: boolean
  onClose: () => void
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-2xl',
  lg: 'max-w-4xl',
}

export function Modal({
  title,
  open,
  onClose,
  children,
  size,
}: PropsWithChildren<ModalProps>) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-slate-900/60 p-4 rounded-x"
      role="presentation"
      onClick={onClose}
    >
      <section
        className={`max-h-[90vh] w-full overflow-y-auto rounded-xl border border-slate-200 bg-white p-4 shadow-xl dark:border-slate-700 dark:bg-slate-900 ${
          sizeClasses[size ?? 'lg']
        }`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(event) => event.stopPropagation()}
      >
        <header className="mb-3 flex items-center justify-between gap-3">
          <h3 className="text-lg font-semibold">{title}</h3>
          <Button variant="secondary" onClick={onClose}>
            <X size={18} />
          </Button>
        </header>
        <div>{children}</div>
      </section>
    </div>
  )
}
