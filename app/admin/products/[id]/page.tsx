"use client"

import { useEffect, useState, use } from "react"
import { ProductForm } from "@/components/admin/product-form"
import { supabase } from "@/lib/supabase"
import type { Product } from "@/lib/types"

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadProduct() {
            try {
                const { data, error } = await supabase
                    .from("products")
                    .select("*")
                    .eq("id", id)
                    .single()

                if (error) throw error

                if (data) {
                    const productData = data as any
                    const formattedProduct: Product = {
                        id: productData.id,
                        name: productData.name,
                        description: productData.description,
                        price: Number(productData.price),
                        category: productData.category as Product["category"],
                        images: productData.images,
                        sizes: productData.sizes,
                        colors: productData.colors,
                        inStock: productData.in_stock,
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
    }, [id])

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
