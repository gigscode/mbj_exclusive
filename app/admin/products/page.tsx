"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Plus, Search, Edit, Trash2, Package } from "lucide-react"
import type { Product } from "@/lib/types"
import { DeleteProductDialog } from "@/components/admin/delete-product-dialog"

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([])
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const [categoryFilter, setCategoryFilter] = useState("all")
    const [deleteProduct, setDeleteProduct] = useState<Product | null>(null)

    useEffect(() => {
        loadProducts()
    }, [])

    useEffect(() => {
        let filtered = products

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter((product) =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }

        // Filter by category
        if (categoryFilter !== "all") {
            filtered = filtered.filter((product) => product.category === categoryFilter)
        }

        setFilteredProducts(filtered)
    }, [searchQuery, categoryFilter, products])

    async function loadProducts() {
        try {
            const { data, error } = await supabase
                .from("products")
                .select("*")
                .order("created_at", { ascending: false })

            if (error) throw error

            // Convert database format to app format
            const formattedProducts: Product[] = (data || []).map((item) => ({
                id: item.id,
                name: item.name,
                description: item.description,
                price: Number(item.price),
                category: item.category as Product["category"],
                images: item.images,
                sizes: item.sizes,
                colors: item.colors,
                inStock: item.in_stock,
            }))

            setProducts(formattedProducts)
            setFilteredProducts(formattedProducts)
        } catch (error) {
            console.error("Error loading products:", error)
        } finally {
            setLoading(false)
        }
    }

    async function handleDelete(product: Product) {
        try {
            const { error } = await supabase
                .from("products")
                .delete()
                .eq("id", product.id)

            if (error) throw error

            // Reload products after deletion
            await loadProducts()
            setDeleteProduct(null)
        } catch (error) {
            console.error("Error deleting product:", error)
            alert("Failed to delete product")
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-charcoal font-medium">Loading products...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-charcoal">Products</h1>
                    <p className="text-gray-600 mt-1">Manage your store inventory</p>
                </div>
                <Link href="/admin/products/new">
                    <Button className="bg-gold hover:bg-gold/90 text-charcoal font-semibold">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Product
                    </Button>
                </Link>
            </div>

            {/* Filters */}
            <Card className="p-4 border-gold/20">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 border-gold/30 focus:border-gold"
                        />
                    </div>
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                        <SelectTrigger className="w-full sm:w-[200px] border-gold/30">
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            <SelectItem value="dresses">Dresses</SelectItem>
                            <SelectItem value="gowns">Gowns</SelectItem>
                            <SelectItem value="separates">Separates</SelectItem>
                            <SelectItem value="bridal">Bridal</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </Card>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
                <Card className="p-12 text-center border-gold/20">
                    <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-charcoal mb-2">No products found</h3>
                    <p className="text-gray-600 mb-6">
                        {searchQuery || categoryFilter !== "all"
                            ? "Try adjusting your search or filters"
                            : "Get started by adding your first product"}
                    </p>
                    {!searchQuery && categoryFilter === "all" && (
                        <Link href="/admin/products/new">
                            <Button className="bg-gold hover:bg-gold/90 text-charcoal font-semibold">
                                <Plus className="mr-2 h-4 w-4" />
                                Add Product
                            </Button>
                        </Link>
                    )}
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <Card key={product.id} className="overflow-hidden border-gold/20 hover:shadow-lg transition-shadow duration-200">
                            <div className="relative aspect-[4/5] bg-gray-100">
                                <Image
                                    src={product.images[0] || "/placeholder.svg"}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-4 space-y-3">
                                <div>
                                    <h3 className="font-semibold text-charcoal line-clamp-1">{product.name}</h3>
                                    <p className="text-gold font-semibold mt-1">₦{product.price.toLocaleString()}</p>
                                    <p className="text-xs text-gray-500 mt-1 capitalize">{product.category}</p>
                                </div>
                                <div className="flex gap-2">
                                    <Link href={`/admin/products/${product.id}`} className="flex-1">
                                        <Button variant="outline" size="sm" className="w-full border-gold/30 hover:bg-gold/10">
                                            <Edit className="h-3 w-3 mr-1" />
                                            Edit
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setDeleteProduct(product)}
                                        className="border-red-200 text-red-600 hover:bg-red-50"
                                    >
                                        <Trash2 className="h-3 w-3" />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {/* Delete Confirmation Dialog */}
            {deleteProduct && (
                <DeleteProductDialog
                    product={deleteProduct}
                    open={!!deleteProduct}
                    onClose={() => setDeleteProduct(null)}
                    onConfirm={() => handleDelete(deleteProduct)}
                />
            )}
        </div>
    )
}
