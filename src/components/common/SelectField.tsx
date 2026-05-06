import type { SelectHTMLAttributes } from 'react'

interface Option {
  label: string
  value: string
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  options: Option[]
  error?: string
  required?: boolean
}

export function SelectField({
  label,
  id,
  options,
  error,
  required,
  ...props
}: SelectFieldProps) {
  return (
    <label className="flex flex-col gap-1.5 text-sm" htmlFor={id}>
      <span className="text-slate-600 dark:text-slate-300">{label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </span>
      <select
        id={id}
        className={`rounded-lg border bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400 dark:bg-slate-900 ${error ? 'border-rose-500' : 'border-slate-300 dark:border-slate-700'
          }`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? <small className="text-xs text-rose-500">{error}</small> : null}
    </label>
  )
}
