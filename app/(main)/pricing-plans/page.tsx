import { Suspense } from "react";
import PricingDataFetcher from "./pricing-data-fetcher";
import { SkeletonGrid } from "@/components/ui/Skeleton";

export default function PricingPage() {
    return (
        <div className="h-full bg-highlight-background text-highlight-foreground border border-border rounded-xl">
            <div className=" max-w-7xl mx-auto space-y-12 p-6 ">
                <div className="text-center space-y-4">
                    <h2 className="text-3xl font-bold tracking-tight">Plans & Pricing</h2>
                    <p className="max-w-2xl mx-auto text-muted-foreground">
                        Scale your business with AI-driven insights. Choose the plan that fits your needs.
                    </p>
                </div>

                {/* Content Area with Suspense */}
                <Suspense fallback={<SkeletonGrid count={4} />}>
                    <PricingDataFetcher />
                </Suspense>
            </div>
        </div>
    );
}