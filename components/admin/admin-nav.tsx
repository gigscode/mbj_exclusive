"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAdmin } from "@/contexts/admin-context"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Package, LogOut, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Products", href: "/admin/products", icon: Package },
]

export function AdminNav() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const pathname = usePathname()
    const { signOut, user } = useAdmin()

    return (
        <>
            {/* Desktop Sidebar */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
                <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gold/20 bg-white px-6 pb-4">
                    <div className="flex h-16 shrink-0 items-center border-b border-gold/20">
                        <h1 className="font-serif text-2xl font-bold text-gold">MBJ Admin</h1>
                    </div>
                    <nav className="flex flex-1 flex-col">
                        <ul role="list" className="flex flex-1 flex-col gap-y-7">
                            <li>
                                <ul role="list" className="-mx-2 space-y-1">
                                    {navigation.map((item) => {
                                        const isActive = pathname === item.href
                                        return (
                                            <li key={item.name}>
                                                <Link
                                                    href={item.href}
                                                    className={cn(
                                                        "group flex gap-x-3 rounded-md p-3 text-sm font-semibold leading-6 transition-all duration-200",
                                                        isActive
                                                            ? "bg-gold text-white"
                                                            : "text-charcoal hover:bg-gold/10 hover:text-gold"
                                                    )}
                                                >
                                                    <item.icon
                                                        className={cn("h-5 w-5 shrink-0", isActive ? "text-white" : "text-gray-400 group-hover:text-gold")}
                                                        aria-hidden="true"
                                                    />
                                                    {item.name}
                                                </Link>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </li>
                            <li className="mt-auto">
                                <div className="p-3 rounded-lg bg-cream border border-gold/20">
                                    <p className="text-xs font-medium text-charcoal mb-1">Logged in as</p>
                                    <p className="text-sm font-semibold text-gold truncate">{user?.email}</p>
                                </div>
                                <Button
                                    onClick={signOut}
                                    variant="outline"
                                    className="w-full mt-3 border-gold/30 text-charcoal hover:bg-gold hover:text-white transition-all duration-200"
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Logout
                                </Button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            {/* Mobile Header */}
            <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden border-b border-gold/20">
                <button
                    type="button"
                    className="-m-2.5 p-2.5 text-charcoal lg:hidden"
                    onClick={() => setMobileMenuOpen(true)}
                >
                    <span className="sr-only">Open sidebar</span>
                    <Menu className="h-6 w-6" aria-hidden="true" />
                </button>
                <div className="flex-1 text-sm font-semibold leading-6 text-charcoal">
                    <h1 className="font-serif text-xl font-bold text-gold">MBJ Admin</h1>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div className="relative z-50 lg:hidden">
                    <div
                        className="fixed inset-0 bg-charcoal/80"
                        onClick={() => setMobileMenuOpen(false)}
                    />
                    <div className="fixed inset-0 flex">
                        <div className="relative mr-16 flex w-full max-w-xs flex-1">
                            <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                <button
                                    type="button"
                                    className="-m-2.5 p-2.5"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <span className="sr-only">Close sidebar</span>
                                    <X className="h-6 w-6 text-white" aria-hidden="true" />
                                </button>
                            </div>
                            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                                <div className="flex h-16 shrink-0 items-center border-b border-gold/20">
                                    <h1 className="font-serif text-2xl font-bold text-gold">MBJ Admin</h1>
                                </div>
                                <nav className="flex flex-1 flex-col">
                                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                        <li>
                                            <ul role="list" className="-mx-2 space-y-1">
                                                {navigation.map((item) => {
                                                    const isActive = pathname === item.href
                                                    return (
                                                        <li key={item.name}>
                                                            <Link
                                                                href={item.href}
                                                                onClick={() => setMobileMenuOpen(false)}
                                                                className={cn(
                                                                    "group flex gap-x-3 rounded-md p-3 text-sm font-semibold leading-6 transition-all duration-200",
                                                                    isActive
                                                                        ? "bg-gold text-white"
                                                                        : "text-charcoal hover:bg-gold/10 hover:text-gold"
                                                                )}
                                                            >
                                                                <item.icon
                                                                    className={cn("h-5 w-5 shrink-0", isActive ? "text-white" : "text-gray-400 group-hover:text-gold")}
                                                                    aria-hidden="true"
                                                                />
                                                                {item.name}
                                                            </Link>
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        </li>
                                        <li className="mt-auto">
                                            <div className="p-3 rounded-lg bg-cream border border-gold/20 mb-3">
                                                <p className="text-xs font-medium text-charcoal mb-1">Logged in as</p>
                                                <p className="text-sm font-semibold text-gold truncate">{user?.email}</p>
                                            </div>
                                            <Button
                                                onClick={signOut}
                                                variant="outline"
                                                className="w-full border-gold/30 text-charcoal hover:bg-gold hover:text-white transition-all duration-200"
                                            >
                                                <LogOut className="mr-2 h-4 w-4" />
                                                Logout
                                            </Button>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
