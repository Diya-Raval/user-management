import type { ReactNode } from 'react'

interface CardProps {
    title?: string
    icon?: ReactNode
    children: ReactNode
    className?: string
}

export function Card({ title, icon, children, className = '' }: CardProps) {
    return (
        <div
            className={`rounded-2xl border border-slate-200 bg-white dark:border-slate-700/60 dark:bg-slate-900 ${className}`}
        >
            {title && (
                <div className="flex items-center gap-2 border-b border-slate-100 px-5 py-3.5 dark:border-slate-700/60">
                    {icon && (
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                            {icon}
                        </span>
                    )}
                    <h2 className="text-sm font-semibold tracking-wide text-slate-500 uppercase dark:text-slate-400">
                        {title}
                    </h2>
                </div>
            )}
            <div className="px-5 py-4">{children}</div>
        </div>
    )
}