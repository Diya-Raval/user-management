import { X } from '@phosphor-icons/react'
import type { ReactNode } from 'react'
import { Button } from './Button'

interface TableFilterModalProps {
  open: boolean
  content?: ReactNode
  onClose: () => void
  onApply?: () => void
  onReset?: () => void
}

export function TableFilterModal({
  open,
  content,
  onClose,
  onApply,
  onReset,
}: TableFilterModalProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/60 p-4">
      <section className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-4 shadow-xl dark:border-slate-700 dark:bg-slate-900">
        <header className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-semibold">Filters</h3>
          <Button
            onClick={onClose}
            variant="secondary"
            className="rounded-md p-1 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X size={18} />
          </Button>
        </header>
        <div className="space-y-3">{content}</div>
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="secondary" onClick={onReset}>
            Reset
          </Button>
          <Button onClick={onApply}>Apply</Button>
        </div>
      </section>
    </div>
  )
}
