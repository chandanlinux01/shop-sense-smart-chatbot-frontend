"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useLoadingStore } from "@/store/useLoadingStore";
import { Spinner } from "./Loading";

export function FullPageLoader() {
    const { isLoading, message } = useLoadingStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted || !isLoading) return null;

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background/80 backdrop-blur-md transition-all duration-300">
            <div className="relative flex flex-col items-center space-y-4 p-8 rounded-2xl bg-card border border-border shadow-2xl animate-in fade-in zoom-in duration-300">
                <Spinner size="xl" variant="primary" />
                {message && (
                    <p className="text-sm font-bold tracking-wide text-foreground animate-pulse">
                        {message}
                    </p>
                )}
            </div>
        </div>,
        document.body
    );
}
