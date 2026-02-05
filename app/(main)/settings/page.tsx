"use client";

import React from "react";
import Image from "next/image";
import { Search, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function SettingsPage() {
    return (
        <div className="p-4 sm:p-6 lg:p-10 max-w-6xl mx-auto animate-in fade-in duration-500">
            <div className="bg-background text-foreground border border-border rounded-[24px] p-8 shadow-sm space-y-12">
                {/* Top Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold tracking-tight">Welcome, Amanda</h1>
                        <p className="text-muted-foreground text-sm font-medium">Sun, 05 Jan 2025</p>
                    </div>

                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full bg-background border border-border rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                    </div>
                </div>

                {/* Profile Section */}
                <div className="flex flex-col sm:flex-row justify-between items-center bg-muted/20 dark:bg-zinc-900/40 rounded-2xl p-6 border border-border/50">
                    <div className="flex items-center gap-5 w-full sm:w-auto">
                        <div className="relative h-20 w-20 rounded-full overflow-hidden border-2 border-primary/10 shadow-md">
                            {/* <Image
                                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&h=150&auto=format&fit=crop"
                                alt="Amanda Profile"
                                fill
                                className="object-cover"
                            /> */}
                        </div>
                        <div className="space-y-0.5">
                            <h2 className="text-2xl font-bold tracking-tight">Amanda</h2>
                            <p className="text-muted-foreground font-medium text-sm">amanda@gmail.com</p>
                        </div>
                    </div>

                    <Button className="mt-4 sm:mt-0 bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 text-white hover:bg-zinc-800 dark:hover:bg-zinc-200 font-bold px-8 py-2 rounded-lg transition-all flex items-center gap-2">
                        Edit
                    </Button>
                </div>
            </div>
        </div>
    );
}
