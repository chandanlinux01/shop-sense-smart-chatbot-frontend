"use client";

import React from "react";
import {
    TrendingUp,
    Users,
    ShoppingBag,
    DollarSign,
    ArrowUpRight,
    MessageSquare,
    Clock,
    ChevronRight,
    MoreHorizontal
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- Mock Data ---

const metrics = [
    {
        title: "Total Conversation",
        value: "124",
        trend: "+12%",
        trendUp: true,
        subValue: "Today",
        footerLabel: "This Month:",
        footerValue: "3,548",
        icon: MessageSquare,
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
    },
    {
        title: "Active Users",
        value: "89",
        trend: "+5%",
        trendUp: true,
        subValue: "Chat Interactions",
        footerLabel: "Returning Users:",
        footerValue: "21",
        icon: Users,
        color: "text-blue-500",
        bg: "bg-blue-500/10",
    },
    {
        title: "Conversions via Chatbot",
        value: "16",
        trend: "+2%",
        trendUp: true,
        subValue: "Purchases Influenced: 16 today",
        footerLabel: "Conversion Rate:",
        footerValue: "12.4%",
        icon: ShoppingBag,
        color: "text-amber-500",
        bg: "bg-amber-500/10",
    },
    {
        title: "Revenue Influenced",
        value: "$34,500",
        trend: "+18%",
        trendUp: true,
        subValue: "Today",
        footerLabel: "$275,800",
        footerValue: "this month",
        icon: DollarSign,
        color: "text-violet-500",
        bg: "bg-violet-500/10",
    },
];

const recentConversations = [
    { user: "Daniel Green", message: "Where is my order #22318", status: "Pending", time: "8 minutes ago" },
    { user: "Lucas Gray", message: "Where is my order #12239", status: "Pending", time: "12 minutes ago" },
    { user: "Ryan Turner", message: "Where is my order #44567", status: "Pending", time: "15 minutes ago" },
];

const topQueries = [
    "Where is my order?",
    "Do you have COD?",
    "Which API is used most?",
];

// --- Components ---

const MetricCard = ({ metric }: { metric: typeof metrics[0] }) => {
    const Icon = metric.icon;
    return (
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{metric.title}</p>
            </div>
            <div className="space-y-1">
                <div className="flex items-center gap-3">
                    <h3 className="text-4xl font-bold tracking-tight">{metric.value}</h3>
                    {metric.trendUp && (
                        <ArrowUpRight className="h-6 w-6 text-emerald-500" />
                    )}
                </div>
                <p className="text-sm font-medium">{metric.subValue}</p>
            </div>
            <div className="mt-4 flex items-center gap-1 text-sm">
                <span className="text-emerald-500 font-bold">{metric.footerLabel}</span>
                <span className="text-emerald-500 font-bold">{metric.footerValue}</span>
            </div>
        </div>
    );
};

const UsageChart = () => {
    return (
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                <h3 className="text-xl font-bold">Usage Analytics</h3>
                <div className="flex bg-muted p-1 rounded-lg">
                    {["Daily", "Weekly", "Monthly"].map((period) => (
                        <button
                            key={period}
                            className={cn(
                                "px-4 py-1.5 text-xs font-semibold rounded-md transition-all",
                                period === "Monthly" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {period}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex items-center gap-6 mb-8">
                <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-emerald-500" />
                    <span className="text-sm font-medium text-muted-foreground">Predictions per day</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-sky-300" />
                    <span className="text-sm font-medium text-muted-foreground">Active chats</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-blue-600" />
                    <span className="text-sm font-medium text-muted-foreground">Conversion influence</span>
                </div>
            </div>

            {/* Mock Chart SVG */}
            <div className="relative h-[250px] w-full mt-4">
                <svg className="h-full w-full overflow-visible" viewBox="0 0 1000 250" preserveAspectRatio="none">
                    {/* Grid Lines */}
                    {[0, 25, 50, 75, 100].map((y) => (
                        <line
                            key={y}
                            x1="0"
                            y1={250 - (y * 2.5)}
                            x2="1000"
                            y2={250 - (y * 2.5)}
                            stroke="currentColor"
                            strokeOpacity="0.05"
                            strokeWidth="1"
                        />
                    ))}

                    {/* Predictions per day (Emerald) - Based on image curve */}
                    <path
                        d="M0,230 Q100,210 200,180 T400,160 T600,120 T800,100 T1000,90"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="3"
                    />

                    {/* Active chats (Sky) */}
                    <path
                        d="M0,240 Q100,230 200,210 T400,190 T600,160 T800,140 T1000,130"
                        fill="none"
                        stroke="#7dd3fc"
                        strokeWidth="3"
                    />

                    {/* Conversion influence (Blue) */}
                    <path
                        d="M0,245 Q100,243 200,240 T400,235 T600,230 T800,228 T1000,225"
                        fill="none"
                        stroke="#2563eb"
                        strokeWidth="3"
                    />
                </svg>

                <div className="flex justify-between mt-6 text-sm text-muted-foreground font-medium">
                    {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"].map((month) => (
                        <span key={month}>{month}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default function DashboardPage() {
    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto space-y-10">
            {/* Header */}
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
                <p className="text-muted-foreground">Monitor your chatbot's performance and conversion metrics.</p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {metrics.map((metric, i) => (
                    <MetricCard key={i} metric={metric} />
                ))}
            </div>

            {/* Usage Analytics */}
            <UsageChart />

            <div className="space-y-4">
                <h3 className="text-2xl font-bold tracking-tight">Chatbot Performance Overview</h3>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    {/* Accuracy Card */}
                    <div className="lg:col-span-2 bg-background text-foreground border border-border rounded-xl p-8 shadow-sm">
                        <p className="text-sm font-semibold mb-4">Accuracy</p>
                        <div className="flex items-center gap-4 mb-4">
                            <span className="text-6xl font-bold">92%</span>
                            <ArrowUpRight className="h-8 w-8 text-emerald-500" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-bold">Automated response success rate: 87%</p>
                            <p className="text-sm font-bold text-emerald-500">Average response time: 1.2 sec</p>
                        </div>
                    </div>

                    {/* Top Queries */}
                    <div className="lg:col-span-3 bg-background text-foreground border border-border rounded-xl p-2 shadow-sm flex flex-col justify-center">
                        {topQueries.map((query, b) => (
                            <div
                                key={b}
                                className={cn(
                                    "p-5 flex items-center justify-center bg-muted/30 rounded-lg m-1 font-semibold text-lg hover:bg-muted/50 transition-colors cursor-pointer"
                                )}
                            >
                                {query}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Conversations Table */}
            <div className="space-y-4">
                <h3 className="text-2xl font-bold tracking-tight">Recent Conversations</h3>
                <div className="bg-background text-foreground border border-border rounded-xl shadow-sm overflow-hidden">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-border">
                                <th className="px-6 py-4 text-sm font-bold">User</th>
                                <th className="px-6 py-4 text-sm font-bold">Message</th>
                                <th className="px-6 py-4 text-sm font-bold text-center">Status</th>
                                <th className="px-6 py-4 text-sm font-bold text-right">Time</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                            {recentConversations.map((conv, idx) => (
                                <tr key={idx} className="hover:bg-muted/10">
                                    <td className="px-6 py-4 text-sm font-medium">{conv.user}</td>
                                    <td className="px-6 py-4 text-sm text-muted-foreground">{conv.message}</td>
                                    <td className="px-6 py-4 text-sm font-medium text-center">{conv.status}</td>
                                    <td className="px-6 py-4 text-sm text-muted-foreground text-right">{conv.time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}