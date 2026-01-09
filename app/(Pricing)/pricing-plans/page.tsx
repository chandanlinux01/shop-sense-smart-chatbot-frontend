"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface PricingFeature {
    text: string;
    included: boolean;
}

interface PricingTier {
    name: string;
    price: number;
    period: string;
    features: PricingFeature[];
    recommended?: boolean;
    buttonText?: string;
    variant: "default" | "highlighted";
}

const featuresList = [
    "Detail Page",
    "Ratings and Reviews",
    "E-mail",
    "Url",
    "Phone",
    "Additional Phone",
];

const PricingPage = () => {
    const [isYearly, setIsYearly] = React.useState<boolean>(true);

    const tiers: PricingTier[] = [
        {
            name: "Silver",
            price: 99.99,
            period: "/Year",
            features: featuresList.map(f => ({ text: f, included: true })),
            variant: "default",
            buttonText: "Start Today"
        },
        {
            name: "Gold",
            price: 349.99,
            period: "/Year",
            features: featuresList.map(f => ({ text: f, included: true })),
            recommended: true,
            variant: "highlighted",
            buttonText: "Start Today"
        },
        {
            name: "Bronze",
            price: 99.99,
            period: "/Year",
            features: featuresList.map(f => ({ text: f, included: true })),
            variant: "default",
            buttonText: "Start Today"
        }
    ];

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-7xl mx-auto space-y-12 p-4 rounded-2xl">
                {/* Header */}
                <div className="text-center space-y-6">
                    <div className="flex items-center justify-center gap-2 mb-8">
                        {/* Assuming we can reuse the logo approach from login or just text based on the image */}
                        <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-foreground justify-center">
                            <div className="relative w-10 h-10">
                                {/* Placeholder for logo icon if available, or just use the text style */}
                                <Image
                                    src="/images/shop_sense_logo.png"
                                    alt="ShopSense Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <span className="shop-sense-text font-extrabold text-3xl">ShopSense AI</span>
                        </h1>
                    </div>

                    <h2 className="text-3xl font-bold text-foreground">Pricing</h2>
                    <p className="max-w-2xl mx-auto text-foreground text-sm sm:text-base leading-relaxed">
                        It Is A Long Established Fact That A Reader Will Be Distracted By The Readable Content Of A Page When Looking At Its Layout.
                    </p>

                    {/* Toggle */}
                    <div className="text-border flex justify-end items-center gap-3 text-sm font-semibold text-foreground pr-4 sm:pr-12 lg:pr-32">
                        <div
                            className="relative w-12 h-6 bg-[#009ca6] rounded-full cursor-pointer p-1 transition-colors"
                            onClick={() => setIsYearly(!isYearly)}
                        >
                            <div
                                className={cn(
                                    "bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300",
                                    isYearly ? "translate-x-6" : "translate-x-0"
                                )}
                            />
                        </div>
                        <span>Monthly / Yearly</span>
                    </div>
                </div>

                {/* Pricing Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-4">
                    {tiers.map((tier, index) => (
                        <PricingCard key={index} tier={tier} />
                    ))}
                </div>
            </div>
        </div>
    );
};

const PricingCard = ({ tier }: { tier: PricingTier }) => {
    const isHighlighted = tier.variant === "highlighted";

    return (
        <div
            className={cn(
                "relative rounded-2xl p-8 flex flex-col transition-all duration-300",
                isHighlighted
                    ? "bg-[#01A1A8] text-white shadow-xl transform md:-translate-y-4 z-10"
                    : "bg-white text-gray-900 shadow-lg border border-gray-100"
            )}
        >
            {tier.recommended && (
                <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white text-[#01A1A8] text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-wider">
                    Recommended
                </div>
            )}

            <div className="text-center mt-4">
                <h3 className={cn("text-lg font-bold mb-4", isHighlighted ? "text-white" : "text-gray-900")}>
                    {tier.name}
                </h3>
                <div className="flex items-baseline justify-center mb-1">
                    <span className="text-sm align-top mr-1">$</span>
                    <span className="text-4xl font-bold tracking-tight">{tier.price}</span>
                    <span className={cn("text-sm ml-1", isHighlighted ? "text-white/80" : "text-gray-500")}>
                        {tier.period}
                    </span>
                </div>
            </div>

            <ul className="space-y-4 my-8 flex-1">
                {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm">
                        <div className={cn(
                            "flex items-center justify-center w-5 h-5 rounded-sm",
                            isHighlighted ? "text-white" : "text-[#01A1A8]"
                        )}>
                            <CheckSquareIcon checked={feature.included} className="w-5 h-5" />
                        </div>
                        <span className={cn(isHighlighted ? "text-white/90" : "text-gray-600")}>
                            {feature.text}
                        </span>
                    </li>
                ))}

                {/* Visual filler for not included items if needed, but design shows all checks */}
                <li className="flex items-center gap-3 text-sm font-bold cursor-pointer mt-4">
                    <span className={cn("text-xs font-bold hover:underline", isHighlighted ? "text-white" : "text-[#01A1A8]")}>
                        Read More
                    </span>
                </li>
            </ul>

            <Button
                variant={isHighlighted ? "secondary" : "outline"}
                className={cn(
                    "w-full rounded-lg py-6 font-bold text-base transition-colors border",
                    isHighlighted
                        ? "bg-black text-white hover:bg-gray-900 border-transparent"
                        : "bg-white text-[#01A1A8] border-[#01A1A8] hover:bg-[#F0FEFF]"
                )}
            >
                {tier.buttonText}
            </Button>
        </div>
    );
};

// Custom Check Icon to match the square checkbox look in valid design
const CheckSquareIcon = ({ checked, className }: { checked: boolean, className?: string }) => {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            className={className}
            stroke="currentColor"
            strokeWidth="2"
        >
            <path d="M7 13l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="3" y="3" width="18" height="18" rx="4" strokeWidth="2" />
        </svg>
    );
}

export default PricingPage;
