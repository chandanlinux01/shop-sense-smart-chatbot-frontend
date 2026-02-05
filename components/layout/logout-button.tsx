"use client"

import { useRouter } from "next/navigation";
import { logoutAction } from "@/actions/auth.actions";
import { useUserStore } from "@/store/useUserStore";
import { useLoadingStore } from "@/store/useLoadingStore";
import { LogOut } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";

export function LogoutButton() {
    const router = useRouter();
    const clearUser = useUserStore((state) => state.clearUser);
    const { startLoading, stopLoading } = useLoadingStore();

    const handleLogout = async () => {
        try {
            startLoading("Logging out...");

            // 1. Server Side: Delete Cookie (Always first!)
            const result = await logoutAction();

            if (result.success) {
                // 2. Refresh the Server Cache 
                // इसे Push से पहले करने पर Next.js को पता चल जाता है कि यूजर अब 'Guest' है
                router.refresh();

                // 3. Client Side: Clear Zustand Store
                clearUser();

                toast.success("Logged out successfully");

                // 4. Redirect
                router.push("/login");
            }
        } catch (error) {
            toast.error("Logout failed. Please try again.");
        } finally {
            stopLoading();
        }
    };

    return (
        <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full flex justify-start items-center gap-2"
        >
            <LogOut className="h-4 w-4 text-foreground" />
            <span>Logout</span>
        </Button>
    );
}