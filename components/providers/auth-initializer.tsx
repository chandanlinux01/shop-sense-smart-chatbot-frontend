"use client"

import { useRef } from "react";
import { useUserStore } from "@/store/useUserStore";

export function AuthInitializer({ children, initialUser }: { children: React.ReactNode, initialUser: any }) {
    // 1. Ek ref banayein track karne ke liye ki kya data initialize ho gaya hai
    const initialized = useRef(false);

    if (!initialized.current && initialUser) {
        // 2. Store ko render cycle ke dauran hi set kar dein (Before useEffect)
        // Ye client-side hydration se pehle state ko sync kar deta hai
        useUserStore.setState({ user: initialUser });
        initialized.current = true;
    }

    return <>{children}</>;
}