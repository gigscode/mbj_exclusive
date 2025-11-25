"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"

export function BookingSection() {
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
    <section ref={sectionRef} className="relative py-32 lg:py-40 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="/bookingimg.jpg"
          alt="MBJ Exclusive Atelier"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/70" />
      </div>

      {/* Content */}
      <div
        className={`relative z-10 container mx-auto px-4 lg:px-8 text-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
      >
        <span className="text-gold text-sm tracking-[0.3em] uppercase font-medium">Experience Luxury</span>
        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-cream mt-4 mb-6 text-balance">
          Book Your Luxury Fitting Experience
        </h2>
        <p className="text-cream/80 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Visit our exclusive atelier for a personalized consultation. Let our expert stylists guide you to your perfect
          look in an atmosphere of pure elegance.
        </p>
        <a
          href="https://wa.me/2349064515891?text=Hello%2C%20I%20would%20like%20to%20schedule%20an%20appointment%20at%20MBJ%20EXCLUSIVE"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            size="lg"
            className="bg-gold hover:bg-gold-dark text-charcoal px-12 py-7 text-sm tracking-widest uppercase font-medium transition-all duration-300 hover:shadow-2xl rounded-full group"
          >
            <Calendar className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
            Schedule Appointment
          </Button>
        </a>
      </div>
    </section>
  )
}
