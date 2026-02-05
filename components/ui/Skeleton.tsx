import { cn } from "@/lib/utils";

// 1. Basic Primitive (Jo tumhare paas pehle se hai)
interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Skeleton({ className, ...props }: SkeletonProps) {
    return (
        <div
            className={cn("animate-pulse rounded-md bg-muted/50", className)}
            {...props}
        />
    );
}

// ------------------------------------------------------------------
// 2. NEW: Generic Card Skeleton (Ye 90% jagah kaam karega)
// ------------------------------------------------------------------
export function SkeletonCard({ className }: { className?: string }) {
    return (
        <div className={cn("flex flex-col space-y-4 p-6 border rounded-xl bg-card", className)}>
            {/* Header / Image Area */}
            <Skeleton className="h-12 w-12 rounded-full" />
            <Skeleton className="h-6 w-3/4" />

            {/* Body Lines */}
            <div className="space-y-2 flex-1 pt-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[90%]" />
                <Skeleton className="h-4 w-[80%]" />
            </div>

            {/* Footer / Button Area */}
            <Skeleton className="h-12 w-full mt-4 rounded-md" />
        </div>
    )
}

// ------------------------------------------------------------------
// 3. NEW: Generic Grid Wrapper (Magic Component)
// ------------------------------------------------------------------
export function SkeletonGrid({
    count = 4,
    className
}: {
    count?: number;
    className?: string;
}) {
    return (
        <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", className)}>
            {Array.from({ length: count }).map((_, i) => (
                <SkeletonCard key={i} />
            ))}
        </div>
    );
}