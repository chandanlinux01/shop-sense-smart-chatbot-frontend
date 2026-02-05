import { Spinner } from "@/components/ui/Loading";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="flex flex-col items-center space-y-4">
                <Spinner size="xl" variant="primary" />
                <p className="text-sm font-bold tracking-wide text-foreground animate-pulse">
                    Loading ShopSense AI...
                </p>
            </div>
        </div>
    );
}
