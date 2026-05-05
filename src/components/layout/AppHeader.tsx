import { Moon, Sun } from '@phosphor-icons/react'

interface AppHeaderProps {
  darkMode: boolean
  onToggleTheme: () => void
}

export function AppHeader({ darkMode, onToggleTheme }: AppHeaderProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-700 dark:bg-slate-900/85">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <h2 className="text-base font-semibold sm:text-lg">User Management Dashboard</h2>
        <button
          className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-3 py-1.5 text-sm dark:border-slate-600"
          onClick={onToggleTheme}
        >
          {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          {darkMode ? 'Light' : 'Dark'}
        </button>
      </div>
    </header>
  )
}
