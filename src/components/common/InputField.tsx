import type { InputHTMLAttributes } from 'react'

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string
  error?: string
}

export function InputField({ id, label, error, className, ...rest }: InputFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}
      </label>
      <input
        id={id}
        className={`rounded-lg border px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-blue-500
          ${error
            ? 'border-red-400 focus:ring-red-400'
            : 'border-slate-300 dark:border-slate-700 dark:bg-slate-900'
          } ${className || ''}`}
        {...rest}
      />
      {error ? <span className="text-xs text-red-500">{error}</span> : null}
    </div>
  )
}