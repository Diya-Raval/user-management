import { Skeleton } from "./Skeleton"

interface TableSkeletonProps {
    columns: number
    rows?: number
}

export function TableSkeleton({
    columns,
    rows = 5,
}: TableSkeletonProps) {
    return (
        <>
            {Array.from({ length: rows }).map((_, rowIndex) => (
                <tr
                    key={rowIndex}
                    className="border-t border-slate-200 dark:border-slate-700"
                >
                    {Array.from({ length: columns }).map((_, colIndex) => (
                        <td key={colIndex} className="px-3 py-4">
                            <Skeleton className="h-4 w-full" />
                        </td>
                    ))}
                </tr>
            ))}
        </>
    )
}