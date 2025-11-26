"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAdmin } from "@/contexts/admin-context"
import { AdminNav } from "@/components/admin/admin-nav"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, loading } = useAdmin()
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        if (!loading && !isAuthenticated && pathname !== "/admin/login") {
            router.push("/admin/login")
        }
    }, [isAuthenticated, loading, pathname, router])

    // Show loading state while checking authentication
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-charcoal font-medium">Loading...</p>
                </div>
            </div>
        )
    }

    // Don't render protected content if not authenticated
    if (!isAuthenticated && pathname !== "/admin/login") {
        return null
    }

    // Login page doesn't need the admin layout
    if (pathname === "/admin/login") {
        return <>{children}</>
    }

    return (
        <div className="min-h-screen bg-background">
            <AdminNav />
            <main className="lg:pl-64">
                <div className="container mx-auto p-4 lg:p-8">
                    {children}
                </div>
            </main>
        </div>
    )
}
