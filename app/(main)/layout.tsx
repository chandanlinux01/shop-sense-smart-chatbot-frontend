import { Sidebar } from "@/components/layout/Sidebar"
import { Header } from "@/components/layout/Header"

export default function MainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen overflow-hidden bg-background">
            <Sidebar />
            <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                <Header />
                <main className="flex-1 p-2">
                    {children}
                </main>
            </div>
        </div>
    )
}
