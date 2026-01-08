export function Spinner({ className }: { className?: string }) {
    return (
        <div className={`relative flex items-center justify-center ${className}`}>
            <div className="h-full w-full animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
    );
}

/**
 * Global Client Loader
 * Use this inside your client components when making API calls.
 * Example: {loading && <GlobalClientLoader message="Updating profile..." />}
 */

export function GlobalClientLoader({ message }: { message?: string }) {
    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background/60 backdrop-blur-md transition-all duration-300">
            <div className="relative flex flex-col items-center space-y-4 p-8 rounded-2xl bg-white dark:bg-zinc-900 shadow-2xl border border-zinc-200 dark:border-zinc-800">
                <Spinner className="h-12 w-12" />
                {message && (
                    <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-400 animate-pulse tracking-wide">
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}