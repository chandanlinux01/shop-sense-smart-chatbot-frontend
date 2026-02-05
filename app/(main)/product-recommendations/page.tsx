"use client";

import React, { useState } from "react";
import {
    ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

// --- Mock Data ---

const metrics = [
    {
        title: "Total Recommendations",
        value: "248",
        trendUp: true,
        footerLabel: "Today",
        footerValue: "This Month: 3,548",
    },
    {
        title: "Most Recommended Category",
        isTags: true,
        tags: ["Skincare", "Shoes", "Electronics"],
    },
    {
        title: "Avg. Conversion Rate",
        value: "3.8%",
    },
    {
        title: "Active AI Rules",
        value: "05",
        suffix: "Rules",
        color: "text-emerald-500",
    },
];

const recentConversations = [
    { user: "Daniel Green", message: "", status: "", time: "" },
    { user: "Lucas Gray", message: "", status: "", time: "" },
    { user: "Ryan Turner", message: "", status: "", time: "" },
];

// --- Components ---

const MetricCard = ({ metric }: { metric: any }) => {
    return (
        <div className="bg-background text-foreground border border-border rounded-[20px] p-6 shadow-sm hover:shadow-md transition-all duration-300 min-h-[160px] flex flex-col justify-between">
            <div className="space-y-4">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{metric.title}</p>

                {metric.isTags ? (
                    <div className="flex flex-wrap gap-2 mt-2">
                        {metric.tags.map((tag: string) => (
                            <button key={tag} className="bg-[#01a1a8] hover:bg-[#0eced3] text-white text-xs font-bold py-2 px-4 rounded-md transition-colors">
                                {tag}
                            </button>
                        ))}
                    </div>
                ) : (
                    <div className="flex items-center gap-3">
                        <h3 className="text-4xl font-bold tracking-tight">{metric.value}</h3>
                        {metric.trendUp && (
                            <ArrowUpRight className="h-8 w-8 text-emerald-500 font-bold" />
                        )}
                        {metric.suffix && (
                            <span className={cn("text-lg font-bold ml-1", metric.color)}>{metric.suffix}</span>
                        )}
                    </div>
                )}
            </div>

            {!metric.isTags && (
                <div className="mt-4 flex items-center gap-1 text-sm">
                    <span className="text-muted-foreground font-medium">{metric.footerLabel || "Today"}</span>
                    <span className="text-emerald-500 font-bold ml-1">{metric.footerValue || (metric.title === "Avg. Conversion Rate" ? "" : "Active Rules")}</span>
                </div>
            )}
        </div>
    );
};

export default function ProductRecommendationsPage() {
    const [primaryLogic, setPrimaryLogic] = useState("Best sellers / Trending / Personalized / Discounts");
    const [fallbackLogic, setFallbackLogic] = useState("Best sellers / Trending / Personalized / Discounts");
    const [maxProducts, setMaxProducts] = useState("12");
    const [sorting, setSorting] = useState("Price low -> high, high -> low");

    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto space-y-12 animate-in fade-in duration-500 text-foreground">
            {/* Header */}
            <div className="flex flex-col gap-1">
                <h1 className="text-4xl font-bold tracking-tight">
                    <span className="text-primary">Product</span> <span className="text-muted-foreground">Recommendations</span>
                </h1>
                <p className="text-muted-foreground font-medium">Configure how your AI recommends products to customers.</p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {metrics.map((metric, i) => (
                    <MetricCard key={i} metric={metric} />
                ))}
            </div>

            {/* Recommendation Logic Section */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold tracking-tight text-muted-foreground">Recommendation Logic</h2>
                <div className="bg-background text-foreground border border-border rounded-[24px] p-8 shadow-sm max-w-2xl">
                    <div className="space-y-6">
                        <Input
                            label="Primary Recommendation Logic"
                            value={primaryLogic}
                            onChange={(e) => setPrimaryLogic(e.target.value)}
                            className="h-12 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-muted-foreground font-medium text-xs py-1"
                        />

                        <Input
                            label="Fallback Recommendation Logic (Dropdown)"
                            value={fallbackLogic}
                            onChange={(e) => setFallbackLogic(e.target.value)}
                            className="h-12 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-muted-foreground font-medium text-xs py-1"
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Input
                                label="Max Products to Show"
                                value={maxProducts}
                                onChange={(e) => setMaxProducts(e.target.value)}
                                className="h-12 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-muted-foreground font-medium"
                            />
                            <Input
                                label="Sorting Preference"
                                value={sorting}
                                onChange={(e) => setSorting(e.target.value)}
                                className="h-12 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-muted-foreground font-medium"
                            />
                        </div>

                        <Button className="bg-[#01a1a8] hover:bg-[#0eced3] text-white font-bold h-10 px-6 rounded-lg mt-2 text-sm">
                            Save Logic
                        </Button>
                    </div>
                </div>
            </div>

            {/* Recent Conversations Table */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold tracking-tight text-muted-foreground">Recent Conversations</h2>
                <div className="bg-background text-foreground border border-border rounded-[32px] shadow-sm overflow-hidden min-h-[250px]">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-border bg-background">
                                <th className="px-8 py-6 text-sm font-bold">User</th>
                                <th className="px-12 py-6 text-sm font-bold text-center">Message</th>
                                <th className="px-12 py-6 text-sm font-bold text-center">Status</th>
                                <th className="px-8 py-6 text-sm font-bold text-right">Time</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                            {recentConversations.map((conv, idx) => (
                                <tr key={idx} className="hover:bg-muted/10 transition-colors h-14 border-t border-border">
                                    <td className="px-8 py-4 text-sm font-medium text-muted-foreground">{conv.user}</td>
                                    <td className="px-12 py-4"></td>
                                    <td className="px-12 py-4"></td>
                                    <td className="px-8 py-4 text-sm text-muted-foreground text-right"></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="h-6 bg-background"></div>
                </div>
            </div>
        </div>
    );
}
