import { Skeleton } from './Skeleton'

export function FormSkeleton() {
    return (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 animate-pulse">
            {Array.from({ length: 12 }).map((_, index) => (
                <div key={index} className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-11 w-full rounded-xl" />
                </div>
            ))}

            <div className="col-span-full flex justify-end gap-2 mt-4">
                <Skeleton className="h-10 w-24 rounded-xl" />
                <Skeleton className="h-10 w-32 rounded-xl" />
            </div>
        </div>
    )
}