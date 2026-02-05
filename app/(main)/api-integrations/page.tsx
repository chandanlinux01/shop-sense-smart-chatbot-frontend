"use client";

import React, { useState } from "react";
import { Copy, Check, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

// --- Mock Data ---

const existingKeys = [
    {
        key: "abcd1234efgh5678ijkl9012mnop3456qrst",
        status: "Active",
    },
    {
        key: "vuzyw456opqr878stuvwxyz90abcd",
        status: "Inactive",
    },
];

export default function ApiIntegrationsPage() {
    const [currentKey, setCurrentKey] = useState("abcd1234efgh5678ijkl9012mnop3456qrst");
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(currentKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="p-4 sm:p-6 lg:p-10 max-w-5xl mx-auto space-y-12 animate-in fade-in duration-500 text-foreground">
            {/* Header Section */}
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">API Keys</h1>
                <p className="text-muted-foreground font-medium max-w-2xl">
                    API keys allow you to authenticate your application and access the ShopSense API.
                </p>
            </div>

            {/* Generation Section */}
            <div className="bg-background text-foreground border border-border rounded-xl p-2 shadow-sm flex items-center gap-2 group transition-all focus-within:ring-2 focus-within:ring-primary/20">
                <div className="relative flex-1">
                    <input
                        type="text"
                        readOnly
                        value={currentKey}
                        className="w-full bg-transparent border-none outline-none px-4 py-3 text-sm font-medium text-muted-foreground select-all"
                        spellCheck={false}
                    />
                    <button
                        onClick={handleCopy}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-muted rounded-md transition-colors text-muted-foreground hover:text-primary"
                        title="Copy to clipboard"
                    >
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </button>
                </div>
                <Button className="bg-[#01a1a8] hover:bg-[#0eced3] text-white font-bold h-full px-6 py-3 rounded-lg hidden sm:flex items-center gap-2">
                    Generate New Key
                </Button>
            </div>

            {/* Simple button for mobile */}
            <div className="sm:hidden">
                <Button className="w-full bg-[#01a1a8] hover:bg-[#0eced3] text-white font-bold py-3">
                    Generate New Key
                </Button>
            </div>

            {/* Existing Keys Section */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold tracking-tight">Existing Keys</h2>
                <div className="bg-background text-foreground border border-border rounded-xl shadow-sm overflow-hidden overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-border">
                                <th className="px-8 py-5 text-sm font-bold ">Key</th>
                                <th className="px-8 py-5 text-sm font-bold  text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                            {existingKeys.map((item, idx) => (
                                <tr key={idx} className="hover:bg-muted/5 transition-colors h-16">
                                    <td className="px-8 py-4 text-sm font-medium text-muted-foreground font-mono">
                                        <div className="flex items-center gap-2">
                                            <ShieldCheck className={cn("h-4 w-4", item.status === "Active" ? "text-emerald-500" : "text-muted-foreground")} />
                                            {item.key}
                                        </div>
                                    </td>
                                    <td className="px-8 py-4 text-sm font-bold text-right">
                                        <span className={cn(
                                            item.status === "Active" ? "text-emerald-500" : "text-zinc-400"
                                        )}>
                                            {item.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
