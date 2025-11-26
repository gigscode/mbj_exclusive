"use client"

import { useEffect, useState } from "react"
import { ProductForm } from "@/components/admin/product-form"
import { supabase } from "@/lib/supabase"
import type { Product } from "@/lib/types"

export default function EditProductPage({ params }: { params: { id: string } }) {
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadProduct() {
            try {
                const { data, error } = await supabase
                    .from("products")
                    .select("*")
                    .eq("id", params.id)
                    .single()

                if (error) throw error

                if (data) {
                    const formattedProduct: Product = {
                        id: data.id,
                        name: data.name,
                        description: data.description,
                        price: Number(data.price),
                        category: data.category as Product["category"],
                        images: data.images,
                        sizes: data.sizes,
                        colors: data.colors,
                        inStock: data.in_stock,
                    }
                    setProduct(formattedProduct)
                }
            } catch (error) {
                console.error("Error loading product:", error)
                alert("Failed to load product")
            } finally {
                setLoading(false)
            }
        }

        loadProduct()
    }, [params.id])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-charcoal font-medium">Loading product...</p>
                </div>
            </div>
        )
    }

    if (!product) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-charcoal mb-4">Product not found</h2>
                <p className="text-gray-600">The product you're looking for doesn't exist.</p>
            </div>
        )
    }

    return <ProductForm product={product} mode="edit" />
}
