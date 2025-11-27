"use client"

import { useEffect, useState } from "react"
import type { Product } from "@/lib/types"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Package, TrendingUp, DollarSign, ShoppingCart, Plus } from "lucide-react"
import { supabase } from "@/lib/supabase"

interface Stats {
    totalProducts: number
    dresses: number
    gowns: number
    separates: number
    bridal: number
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats>({
        totalProducts: 0,
        dresses: 0,
        gowns: 0,
        separates: 0,
        bridal: 0,
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchStats() {
            try {
                const { data: products, error } = await supabase
                    .from("products")
                    .select("category")

                const typedProducts = products as Pick<Product, "category">[] | null

                if (error) throw error

                const stats: Stats = {
                    totalProducts: typedProducts?.length || 0,
                    dresses: typedProducts?.filter((p) => p.category === "dresses").length || 0,
                    gowns: typedProducts?.filter((p) => p.category === "gowns").length || 0,
                    separates: typedProducts?.filter((p) => p.category === "separates").length || 0,
                    bridal: typedProducts?.filter((p) => p.category === "bridal").length || 0,
                }

                setStats(stats)
            } catch (error) {
                console.error("Error fetching stats:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchStats()
    }, [])

    const statCards = [
        {
            title: "Total Products",
            value: stats.totalProducts,
            icon: Package,
            color: "text-blue-600",
            bgColor: "bg-blue-100",
        },
        {
            title: "Dresses",
            value: stats.dresses,
            icon: ShoppingCart,
            color: "text-purple-600",
            bgColor: "bg-purple-100",
        },
        {
            title: "Gowns",
            value: stats.gowns,
            icon: TrendingUp,
            color: "text-pink-600",
            bgColor: "bg-pink-100",
        },
        {
            title: "Separates",
            value: stats.separates,
            icon: DollarSign,
            color: "text-green-600",
            bgColor: "bg-green-100",
        },
        {
            title: "Bridal",
            value: stats.bridal,
            icon: Package,
            color: "text-gold",
            bgColor: "bg-gold/10",
        },
    ]

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-serif font-bold text-charcoal mb-2">Dashboard</h1>
                <p className="text-gray-600">Welcome to your admin dashboard</p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {statCards.map((stat) => (
                    <Card key={stat.title} className="border-gold/20 hover:shadow-lg transition-shadow duration-200">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">
                                {stat.title}
                            </CardTitle>
                            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-charcoal">
                                {loading ? "..." : stat.value}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Quick Actions */}
            <Card className="border-gold/20">
                <CardHeader>
                    <CardTitle className="text-xl font-serif text-charcoal">Quick Actions</CardTitle>
                    <CardDescription>Manage your store inventory</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-4">
                    <Link href="/admin/products/new">
                        <Button className="bg-gold hover:bg-gold/90 text-charcoal font-semibold">
                            <Plus className="mr-2 h-4 w-4" />
                            Add New Product
                        </Button>
                    </Link>
                    <Link href="/admin/products">
                        <Button variant="outline" className="border-gold/30 text-charcoal hover:bg-gold/10 hover:text-blue-900">
                            <Package className="mr-2 h-4 w-4" />
                            View All Products
                        </Button>
                    </Link>
                </CardContent>
            </Card>

            {/* Recent Activity or Additional Info 
            <Card className="border-gold/20">
                <CardHeader>
                    <CardTitle className="text-xl font-serif text-charcoal">Getting Started</CardTitle>
                    <CardDescription>Complete these steps to set up your store</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                            <div className="mt-0.5 rounded-full bg-gold/20 p-1">
                                <div className="h-2 w-2 rounded-full bg-gold" />
                            </div>
                            <div>
                                <p className="font-medium text-charcoal">Add your first product</p>
                                <p className="text-sm text-gray-600">Upload products to start selling</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="mt-0.5 rounded-full bg-gold/20 p-1">
                                <div className="h-2 w-2 rounded-full bg-gold" />
                            </div>
                            <div>
                                <p className="font-medium text-charcoal">Configure Supabase Storage</p>
                                <p className="text-sm text-gray-600">Set up image storage bucket for products</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="mt-0.5 rounded-full bg-gold/20 p-1">
                                <div className="h-2 w-2 rounded-full bg-gold" />
                            </div>
                            <div>
                                <p className="font-medium text-charcoal">Migrate existing products</p>
                                <p className="text-sm text-gray-600">Import products from your static data</p>
                            </div>
                        </li>
                    </ul>
                </CardContent>
            </Card>*/}
        </div>
    )
}
