"use client";

import React from "react";
import { cn } from "@/lib/utils";

// --- Mock Data ---

const allConversations = [
    { user: "Daniel Green", message: "Where is my order #22918", time: "8 minutes ago" },
    { user: "Lucas Gray", message: "Where is my order #22918", time: "8 minutes ago" },
    { user: "Ryan Turner", message: "Where is my order #22918", time: "8 minutes ago" },
];

const topQuestions = [
    { user: "Daniel Green", message: "Where is my order #22918", time: "8 minutes ago" },
    { user: "Lucas Gray", message: "Where is my order #22918", time: "8 minutes ago" },
    { user: "Ryan Turner", message: "Where is my order #22918", time: "8 minutes ago" },
];

const TableLayout = ({ title, data }: { title: string, data: any[] }) => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">{title}</h2>
            <div className="bg-background text-foreground border border-border rounded-[24px] shadow-sm overflow-hidden overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-border">
                            <th className="px-8 py-5 text-sm font-bold">User</th>
                            <th className="px-8 py-5 text-sm font-bold text-center">Message</th>
                            <th className="px-8 py-5 text-sm font-bold text-right">Time</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">
                        {data.map((item, idx) => (
                            <tr key={idx} className="hover:bg-muted/10 transition-colors h-16">
                                <td className="px-8 py-4 text-sm font-medium text-muted-foreground whitespace-nowrap">
                                    {item.user}
                                </td>
                                <td className="px-8 py-4 text-sm text-muted-foreground text-center">
                                    {item.message}
                                </td>
                                <td className="px-8 py-4 text-sm text-muted-foreground text-right whitespace-nowrap">
                                    {item.time}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* Empty bottom space to match the design padding */}
                <div className="h-4 bg-background"></div>
            </div>
        </div>
    );
};

export default function ConversationsPage() {
    return (
        <div className="p-4 sm:p-6 lg:p-10 max-w-[1400px] mx-auto space-y-12 animate-in fade-in duration-500 text-foreground">
            {/* All Conversations Section */}
            <TableLayout title="All Conversations" data={allConversations} />

            {/* Most Asked Questions Section */}
            <TableLayout title="Most asked questions" data={topQuestions} />
        </div>
    );
}
