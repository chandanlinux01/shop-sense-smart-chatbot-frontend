"use client"

import { useState, useRef, useEffect } from "react"
import { User, LogOut, Settings, ShieldCheck, Ghost } from "lucide-react"
import { ThemeToggle } from "../ui/theme-toggle"
import Image from "next/image"
import { LogoutButton } from "./logout-button"
import { Button } from "../ui/Button"
import { useUserStore } from "@/store/useUserStore"

export function Header() {
    const user = useUserStore((state) => state.user);
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <header className="sticky top-0 z-30 flex min-h-16 items-center justify-between border-b bg-background px-6 shadow-sm">
            <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 shrink-0">
                    <Image src="/images/shop_sense_logo.png" alt="Logo" fill className="object-contain" />
                </div>
                <div className="flex flex-col leading-tight">
                    <span className="shop-sense-text text-xl font-bold tracking-tight">ShopSense AI</span>
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Powered By Anticip8</span>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="hidden md:block">
                    <ThemeToggle />
                </div>

                {/* Dropdown Wrapper */}
                <div className="relative">
                    <Button
                        variant="ghost"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <User className="h-5 w-5" />
                    </Button>

                    {/* Semantic Dropdown Menu */}
                    {isOpen && (
                        <div className="bg-background border border-border rounded-md absolute right-0 mt-2 w-56 glass-card shadow-lg z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                            <div className="px-3 py-2 border-b border-border">
                                <p className="text-sm font-semibold !mb-0">My Account</p>
                                <p className="text-xs text-muted-foreground !mb-0 truncate">{user?.tenant_email}</p>
                            </div>

                            <ul className="p-1">
                                <li>
                                    <LogoutButton />
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}