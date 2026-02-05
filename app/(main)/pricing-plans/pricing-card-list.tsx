"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/store/useUserStore";
import { selectPricingPlanAction } from "@/actions/pricing.actions";
import { AsyncButton } from "@/components/ui/AsyncButton";

interface PricingCardListProps {
    planName: string;
    features: string[];
}

export default function PricingCardList({ planName, features }: PricingCardListProps) {
    const [showAll, setShowAll] = useState(false);
    const user = useUserStore((state) => state.user);
    const isSubscribed = user?.pricing_plan === planName;

    const handleSelectPlan = async () => {
        //return if plan already purchased
        if (isSubscribed) return;

        try {
            const result = await selectPricingPlanAction(planName);
            console.log("result", result);
            if (result.success) {
                window.location.href = result.data.checkout_url;
            }
        } catch (error) {
            console.error("Button Action Failed:", error);
        }
    };

    const displayedFeatures = showAll ? features : features.slice(0, 8);
    const hasMore = features.length > 8;

    return (
        <div className="flex flex-col flex-1 h-full">
            <ul className="space-y-4 mb-4 flex-1 text-sm border-t border-border/10 pt-6">
                {displayedFeatures.map((feature, index) => (
                    <FeatureItem key={index} label={feature} />
                ))}
            </ul>

            {hasMore && (
                <button
                    onClick={() => setShowAll(!showAll)}
                    className="text-primary text-sm mb-6 font-medium bg-transparent border-none outline-none cursor-pointer hover:underline self-start"
                >
                    {showAll ? "Read Less" : "Read More"}
                </button>
            )}

            <div className="mt-auto">
                <AsyncButton
                    onClick={handleSelectPlan}
                    disabled={isSubscribed}
                    variant={user?.pricing_plan === planName ? "success" : "secondary"}
                    className={cn("w-full py-6 font-bold", isSubscribed && "cursor-not-allowed")}
                >
                    {isSubscribed ? "Subscribed" : "Start Today"}
                </AsyncButton>
            </div>
        </div>
    );
}

function FeatureItem({ label }: { label: string }) {
    const formattedLabel = label.replace(/_/g, " ");

    return (
        <li className="flex items-center gap-3">
            <svg
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="w-4 h-4 text-primary shrink-0"
            >
                <path
                    d="M5 10l3 3 7-7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
            <span className="opacity-90 capitalize">{formattedLabel}</span>
        </li>
    );
}