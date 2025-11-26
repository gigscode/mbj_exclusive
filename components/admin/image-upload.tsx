"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, X, ImageIcon } from "lucide-react"
import { supabase } from "@/lib/supabase"

interface ImageUploadProps {
    images: string[]
    onImagesChange: (images: string[]) => void
    maxImages?: number
}

export function ImageUpload({ images, onImagesChange, maxImages = 5 }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false)
    const [dragActive, setDragActive] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            await handleFiles(e.dataTransfer.files)
        }
    }

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        if (e.target.files && e.target.files[0]) {
            await handleFiles(e.target.files)
        }
    }

    const handleFiles = async (files: FileList) => {
        if (images.length >= maxImages) {
            alert(`Maximum ${maxImages} images allowed`)
            return
        }

        const file = files[0]

        // Validate file type
        if (!file.type.startsWith("image/")) {
            alert("Please upload an image file")
            return
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert("Image size must be less than 5MB")
            return
        }

        setUploading(true)

        try {
            // Create unique file name
            const fileExt = file.name.split(".").pop()
            const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
            const filePath = `products/${fileName}`

            // Upload to Supabase Storage
            const { data, error } = await supabase.storage
                .from("product-images")
                .upload(filePath, file)

            if (error) throw error

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from("product-images")
                .getPublicUrl(filePath)

            // Add to images array
            onImagesChange([...images, publicUrl])
        } catch (error) {
            console.error("Error uploading image:", error)
            alert("Failed to upload image. Make sure the 'product-images' bucket exists in Supabase Storage.")
        } finally {
            setUploading(false)
        }
    }

    const removeImage = (index: number) => {
        const newImages = images.filter((_, i) => i !== index)
        onImagesChange(newImages)
    }

    const onButtonClick = () => {
        fileInputRef.current?.click()
    }

    return (
        <div className="space-y-4">
            {/* Upload Area */}
            <div
                className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all ${dragActive
                        ? "border-gold bg-gold/5"
                        : "border-gray-300 hover:border-gold/50"
                    } ${images.length >= maxImages ? "opacity-50 pointer-events-none" : ""}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleChange}
                    disabled={uploading || images.length >= maxImages}
                />

                <div className="space-y-4">
                    <div className="mx-auto w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center">
                        {uploading ? (
                            <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <Upload className="w-8 h-8 text-gold" />
                        )}
                    </div>

                    <div>
                        <p className="text-lg font-medium text-charcoal mb-1">
                            {uploading ? "Uploading..." : "Drop image here or click to upload"}
                        </p>
                        <p className="text-sm text-gray-500">
                            PNG, JPG, or WEBP (max 5MB)
                        </p>
                    </div>

                    <Button
                        type="button"
                        onClick={onButtonClick}
                        disabled={uploading || images.length >= maxImages}
                        className="bg-gold hover:bg-gold/90 text-charcoal"
                    >
                        <ImageIcon className="mr-2 h-4 w-4" />
                        Choose File
                    </Button>
                </div>
            </div>

            {/* Image Preview Grid */}
            {images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {images.map((image, index) => (
                        <Card key={index} className="relative group aspect-square overflow-hidden">
                            <Image
                                src={image}
                                alt={`Product image ${index + 1}`}
                                fill
                                className="object-cover"
                            />
                            <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                            >
                                <X className="w-4 h-4" />
                            </button>
                            {index === 0 && (
                                <div className="absolute bottom-2 left-2 bg-gold text-charcoal text-xs px-2 py-1 rounded font-semibold">
                                    Primary
                                </div>
                            )}
                        </Card>
                    ))}
                </div>
            )}

            <p className="text-sm text-gray-500">
                {images.length} / {maxImages} images uploaded
                {images.length > 0 && " (First image will be the primary image)"}
            </p>
        </div>
    )
}
