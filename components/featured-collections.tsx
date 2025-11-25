"use client"

import { useEffect, useRef, useState } from "react"

const collections = [
  {
    title: "Elegant Couture",
    description: "Bespoke designs for the discerning woman",
    image: "/elegant-african-woman-in-red-couture-gown-runway-f.jpg",
  },
  {
    title: "Ready-to-Wear",
    description: "Everyday luxury for modern living",
    image: "/stylish-african-woman-in-chic-contemporary-outfit-.jpg",
  },
  {
    title: "Bridal & Occasions",
    description: "Unforgettable moments deserve unforgettable style",
    image: "/beautiful-african-bride-in-luxurious-gold-wedding-.jpg",
  },
]

export function FeaturedCollections() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="collections" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <span className="text-gold text-sm tracking-[0.3em] uppercase font-medium">Explore</span>
          <h2 className="font-serif text-3xl md:text-5xl text-charcoal mt-4 text-balance">Featured Collections</h2>
          <div className="w-20 h-0.5 bg-gold mx-auto mt-6" />
        </div>

        {/* Collection Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {collections.map((collection, index) => (
            <div
              key={collection.title}
              className={`group cursor-pointer transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative overflow-hidden rounded-2xl bg-muted aspect-[3/4] mb-6 shadow-lg">
                <img
                  src={collection.image || "/placeholder.svg"}
                  alt={collection.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gold border on hover */}
                <div className="absolute inset-0 border-4 border-transparent group-hover:border-gold transition-all duration-500 rounded-2xl" />
                {/* Overlay */}
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-all duration-500" />
              </div>
              <h3 className="font-serif text-2xl text-charcoal mb-2 group-hover:text-gold transition-colors duration-300">
                {collection.title}
              </h3>
              <p className="text-charcoal-light">{collection.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
