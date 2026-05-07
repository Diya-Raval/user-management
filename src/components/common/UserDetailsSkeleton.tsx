import { Card } from './Card'
import { Skeleton } from './Skeleton'

export function UserDetailsSkeleton() {
    return (
        <div className="space-y-4 animate-pulse">
            <Card>
                <div className="flex flex-col gap-5 sm:flex-row">
                    <Skeleton className="h-24 w-24 rounded-2xl" />

                    <div className="flex-1 space-y-3">
                        <Skeleton className="h-7 w-52" />
                        <Skeleton className="h-4 w-72" />

                        <div className="flex gap-3">
                            <Skeleton className="h-4 w-44" />
                            <Skeleton className="h-4 w-36" />
                        </div>

                        <div className="flex gap-2">
                            <Skeleton className="h-7 w-20 rounded-full" />
                            <Skeleton className="h-7 w-20 rounded-full" />
                            <Skeleton className="h-7 w-16 rounded-full" />
                        </div>
                    </div>
                </div>
            </Card>

            <div className="grid gap-4 sm:grid-cols-2">
                {Array.from({ length: 3 }).map((_, index) => (
                    <Card key={index}>
                        <div className="space-y-4">
                            <Skeleton className="h-5 w-32" />

                            <div className="grid grid-cols-2 gap-4">
                                {Array.from({ length: 4 }).map((__, i) => (
                                    <div key={i} className="space-y-2">
                                        <Skeleton className="h-3 w-20" />
                                        <Skeleton className="h-4 w-full" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}