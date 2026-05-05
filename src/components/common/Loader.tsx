export function Loader({ text = 'Loading...' }: { text?: string }) {
  return (
    <div className="grid min-h-[55vh] place-items-center text-center" aria-live="polite">
      <div className="space-y-3">
        <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-slate-300 border-t-blue-600 dark:border-slate-700 dark:border-t-blue-400" />
        <p className="text-sm text-slate-600 dark:text-slate-300">{text}</p>
      </div>
    </div>
  )
}
