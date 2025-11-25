"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-cream">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23b8860b' fillOpacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div
          className={`transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          {/* Logo */}
          <img
            src="/images/mbjfulllogo.png"
            alt="MBJ Exclusive"
            className="h-32 md:h-48 lg:h-56 w-auto mx-auto mb-8"
          />

          {/* Headline */}
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-charcoal mb-6 tracking-tight">
            <span className="text-gold">Fashion</span> Beyond Clothing
          </h1>

          {/* Subtext */}
          <p className="text-charcoal-light text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Redefining Nigerian luxury fashion for the modern woman.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gold hover:bg-gold-dark text-charcoal px-10 py-6 text-sm tracking-widest uppercase font-medium transition-all duration-300 hover:shadow-lg rounded-full"
            >
              Shop Collection
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-charcoal text-charcoal hover:bg-charcoal hover:text-cream px-10 py-6 text-sm tracking-widest uppercase font-medium transition-all duration-300 rounded-full bg-transparent"
            >
              Book a Fitting
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-charcoal/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-gold rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  )
}
