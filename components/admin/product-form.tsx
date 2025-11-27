"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ImageUpload } from "@/components/admin/image-upload"
import type { Product } from "@/lib/types"
import { supabase } from "@/lib/supabase"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

interface ProductFormProps {
    product?: Product
    mode: "create" | "edit"
}

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"]
const COLORS = ["Black", "White", "Gold", "Silver", "Red", "Blue", "Green", "Purple", "Pink", "Burgundy", "Coral", "Peach", "Navy", "Emerald", "Cream", "Multi"]

export function ProductForm({ product, mode }: ProductFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: product?.name || "",
        description: product?.description || "",
        price: product?.price?.toString() || "",
        category: product?.category || "dresses",
        images: product?.images || [],
        sizes: product?.sizes || [],
        colors: product?.colors || [],
        inStock: product?.inStock ?? true,
        isFeatured: product?.is_featured ?? false,
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            // Validate form
            if (!formData.name || !formData.description || !formData.price) {
                alert("Please fill in all required fields")
                setLoading(false)
                return
            }

            if (formData.images.length === 0) {
                alert("Please upload at least one image")
                setLoading(false)
                return
            }

            if (formData.sizes.length === 0) {
                alert("Please select at least one size")
                setLoading(false)
                return
            }

            if (formData.colors.length === 0) {
                alert("Please select at least one color")
                setLoading(false)
                return
            }

            const productData = {
                name: formData.name,
                description: formData.description,
                price: Number(formData.price),
                category: formData.category,
                images: formData.images,
                sizes: formData.sizes,
                colors: formData.colors,
                in_stock: formData.inStock,
                is_featured: formData.isFeatured,
                updated_at: new Date().toISOString(),
            } as any

            if (mode === "create") {
                const { error } = await (supabase
                    .from("products") as any)
                    .insert([productData])

                if (error) throw error

                alert("Product created successfully!")
                router.push("/admin/products")
            } else {
                const { error } = await (supabase
                    .from("products") as any)
                    .update(productData)
                    .eq("id", product!.id)

                if (error) throw error

                alert("Product updated successfully!")
                router.push("/admin/products")
            }
        } catch (error) {
            console.error("Error saving product:", error)
            alert("Failed to save product. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    const toggleSize = (size: string) => {
        setFormData((prev) => ({
            ...prev,
            sizes: prev.sizes.includes(size)
                ? prev.sizes.filter((s) => s !== size)
                : [...prev.sizes, size],
        }))
    }

    const toggleColor = (color: string) => {
        setFormData((prev) => ({
            ...prev,
            colors: prev.colors.includes(color)
                ? prev.colors.filter((c) => c !== color)
                : [...prev.colors, color],
        }))
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/admin/products">
                    <Button type="button" variant="ghost" size="icon">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                </Link>
                <div className="flex-1">
                    <h1 className="text-3xl font-serif font-bold text-charcoal">
                        {mode === "create" ? "Add New Product" : "Edit Product"}
                    </h1>
                    <p className="text-gray-600 mt-1">
                        {mode === "create" ? "Create a new product for your store" : "Update product information"}
                    </p>
                </div>
                <Button
                    type="submit"
                    disabled={loading}
                    className="bg-gold hover:bg-gold/90 text-charcoal font-semibold"
                >
                    <Save className="mr-2 h-4 w-4" />
                    {loading ? "Saving..." : mode === "create" ? "Create Product" : "Save Changes"}
                </Button>
            </div>

            {/* Basic Information */}
            <Card className="border-gold/20">
                <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription>Provide the essential details for your product</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Product Name *</Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g., Elegant Red Velvet Evening Gown"
                            required
                            className="border-gold/30 focus:border-gold"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description *</Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Describe the product in detail..."
                            rows={4}
                            required
                            className="border-gold/30 focus:border-gold resize-none"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="price">Price (₦) *</Label>
                            <Input
                                id="price"
                                type="number"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                placeholder="0"
                                required
                                min="0"
                                step="1000"
                                className="border-gold/30 focus:border-gold"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category">Category *</Label>
                            <Select
                                value={formData.category}
                                onValueChange={(value) => setFormData({ ...formData, category: value as Product["category"] })}
                            >
                                <SelectTrigger className="border-gold/30">
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="dresses">Dresses</SelectItem>
                                    <SelectItem value="gowns">Gowns</SelectItem>
                                    <SelectItem value="separates">Separates</SelectItem>
                                    <SelectItem value="bridal">Bridal</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="inStock"
                            checked={formData.inStock}
                            onCheckedChange={(checked) => setFormData({ ...formData, inStock: !!checked })}
                        />
                        <Label htmlFor="inStock" className="font-normal cursor-pointer">
                            Product is in stock
                        </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="isFeatured"
                            checked={formData.isFeatured}
                            onCheckedChange={(checked) => setFormData({ ...formData, isFeatured: !!checked })}
                        />
                        <Label htmlFor="isFeatured" className="font-normal cursor-pointer">
                            Featured Product (Show on Home Page)
                        </Label>
                    </div>
                </CardContent>
            </Card>

            {/* Images */}
            <Card className="border-gold/20">
                <CardHeader>
                    <CardTitle>Product Images *</CardTitle>
                    <CardDescription>Upload images of your product (first image will be the primary image)</CardDescription>
                </CardHeader>
                <CardContent>
                    <ImageUpload
                        images={formData.images}
                        onImagesChange={(images) => setFormData({ ...formData, images })}
                    />
                </CardContent>
            </Card>

            {/* Sizes */}
            <Card className="border-gold/20">
                <CardHeader>
                    <CardTitle>Available Sizes *</CardTitle>
                    <CardDescription>Select all sizes available for this product</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-3">
                        {SIZES.map((size) => (
                            <button
                                key={size}
                                type="button"
                                onClick={() => toggleSize(size)}
                                className={`px-6 py-2 rounded-lg border-2 font-semibold transition-all ${formData.sizes.includes(size)
                                    ? "border-gold bg-gold text-charcoal"
                                    : "border-gray-300 text-gray-700 hover:border-gold/50"
                                    }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Colors */}
            <Card className="border-gold/20">
                <CardHeader>
                    <CardTitle>Available Colors *</CardTitle>
                    <CardDescription>Select all colors available for this product</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2">
                        {COLORS.map((color) => (
                            <button
                                key={color}
                                type="button"
                                onClick={() => toggleColor(color)}
                                className={`px-4 py-2 rounded-lg border-2 font-medium transition-all text-sm ${formData.colors.includes(color)
                                    ? "border-gold bg-gold text-charcoal"
                                    : "border-gray-300 text-gray-700 hover:border-gold/50"
                                    }`}
                            >
                                {color}
                            </button>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex justify-end gap-4">
                <Link href="/admin/products">
                    <Button type="button" variant="outline" disabled={loading}>
                        Cancel
                    </Button>
                </Link>
                <Button
                    type="submit"
                    disabled={loading}
                    className="bg-gold hover:bg-gold/90 text-charcoal font-semibold"
                >
                    <Save className="mr-2 h-4 w-4" />
                    {loading ? "Saving..." : mode === "create" ? "Create Product" : "Save Changes"}
                </Button>
            </div>
        </form>
    )
}
