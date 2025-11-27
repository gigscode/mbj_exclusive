"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

import { supabase } from "@/lib/supabase"
import { Product } from "@/lib/types"

export function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    fetchFeaturedProducts()
  }, [])

  const fetchFeaturedProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_featured', true)
        .limit(8)

      if (error) {
        console.error('Error fetching featured products:', error)
        return
      }

      if (data) {
        const mappedProducts: Product[] = (data as any[]).map((item) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          price: Number(item.price),
          category: item.category,
          images: item.images || [],
          sizes: item.sizes || [],
          colors: item.colors || [],
          inStock: item.in_stock,
          is_featured: item.is_featured,
        }))
        setProducts(mappedProducts)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="shop" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <span className="text-gold text-sm tracking-[0.3em] uppercase font-medium">Shop Now</span>
          <h2 className="font-serif text-3xl md:text-5xl text-charcoal mt-4 text-balance">Latest Arrivals</h2>
          <div className="w-20 h-0.5 bg-gold mx-auto mt-6" />
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {loading ? (
            [...Array(4)].map((_, i) => (
              <div key={i} className="aspect-[4/5] bg-muted animate-pulse rounded-xl" />
            ))
          ) : (
            products.map((product, index) => (
              <div
                key={product.id}
                className={`group cursor-pointer transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                  }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden rounded-xl bg-muted aspect-[4/5] mb-4 shadow-md group-hover:shadow-xl transition-shadow duration-500">
                  <Image
                    src={product.images[0] || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Quick view button - Desktop Hover */}
                  <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/30 transition-all duration-300 hidden lg:flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Button
                      size="sm"
                      className="bg-cream text-charcoal hover:bg-gold transition-colors duration-300 rounded-full px-6"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Quick View
                    </Button>
                  </div>

                  {/* Mobile Quick View Button */}
                  <Button
                    size="icon"
                    className="absolute bottom-3 right-3 h-10 w-10 rounded-full bg-cream/90 text-charcoal shadow-lg lg:hidden"
                    aria-label="Quick view"
                  >
                    <Eye className="w-5 h-5" />
                  </Button>
                </div>
                <h3 className="font-medium text-charcoal group-hover:text-gold transition-colors duration-300 text-sm lg:text-base">
                  {product.name}
                </h3>
                <p className="text-gold font-semibold mt-1">₦{product.price.toLocaleString()}</p>
              </div>
            )))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-charcoal text-charcoal hover:bg-charcoal hover:text-cream px-12 py-6 text-sm tracking-widest uppercase font-medium transition-all duration-300 rounded-full bg-transparent"
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  )
}
