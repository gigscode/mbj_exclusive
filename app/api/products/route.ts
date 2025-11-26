import { NextResponse } from "next/server"

// Force this route to be dynamic (not statically generated at build time)
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// Lazy load supabase to prevent build-time errors
function getSupabaseClient() {
    const { supabase } = require("@/lib/supabase")
    return supabase
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const category = searchParams.get("category")
        const limit = searchParams.get("limit")

        const supabase = getSupabaseClient()

        let query = supabase
            .from("products")
            .select("*")
            .eq("in_stock", true)
            .order("created_at", { ascending: false })

        // Filter by category if provided
        if (category && category !== "all") {
            query = query.eq("category", category)
        }

        // Limit results if provided
        if (limit) {
            query = query.limit(parseInt(limit))
        }

        const { data, error } = await query

        if (error) throw error

        // Format response to match frontend Product type
        const products = (data || []).map((item: any) => ({
            id: item.id,
            name: item.name,
            description: item.description,
            price: Number(item.price),
            category: item.category,
            images: item.images,
            sizes: item.sizes,
            colors: item.colors,
            inStock: item.in_stock,
        }))

        return NextResponse.json(products)
    } catch (error) {
        console.error("Error fetching products:", error)
        return NextResponse.json(
            { error: "Failed to fetch products" },
            { status: 500 }
        )
    }
}
