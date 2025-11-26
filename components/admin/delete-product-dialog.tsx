"use client"

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import type { Product } from "@/lib/types"
import Image from "next/image"

interface DeleteProductDialogProps {
    product: Product
    open: boolean
    onClose: () => void
    onConfirm: () => void
}

export function DeleteProductDialog({ product, open, onClose, onConfirm }: DeleteProductDialogProps) {
    return (
        <AlertDialog open={open} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Product?</AlertDialogTitle>
                    <AlertDialogDescription className="space-y-4">
                        <p>Are you sure you want to delete this product? This action cannot be undone.</p>
                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className="relative w-16 h-16 flex-shrink-0 bg-gray-100 rounded">
                                <Image
                                    src={product.images[0] || "/placeholder.svg"}
                                    alt={product.name}
                                    fill
                                    className="object-cover rounded"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-charcoal truncate">{product.name}</p>
                                <p className="text-gold font-medium">₦{product.price.toLocaleString()}</p>
                            </div>
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={onConfirm}
                        className="bg-red-600 hover:bg-red-700 text-white"
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
