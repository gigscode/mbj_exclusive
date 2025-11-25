"use client"

import { useEffect, useRef, useState } from "react"
import { Gem, Scissors, Shield, Truck } from "lucide-react"

const features = [
  {
    icon: Gem,
    title: "Handcrafted Luxury Designs",
    description: "Each piece is meticulously crafted by skilled artisans with decades of experience.",
  },
  {
    icon: Scissors,
    title: "Premium Materials & Tailoring",
    description: "We source only the finest fabrics and materials from trusted suppliers worldwide.",
  },
  {
    icon: Shield,
    title: "Perfect Fit Guarantee",
    description: "Our bespoke fitting process ensures every garment fits you flawlessly.",
  },
  {
    icon: Truck,
    title: "Nigeria-Wide Delivery",
    description: "Fast and secure delivery to your doorstep anywhere in Nigeria.",
  },
]

export function WhyChooseUs() {
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
    <section ref={sectionRef} className="py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <span className="text-gold text-sm tracking-[0.3em] uppercase font-medium">Why Us</span>
          <h2 className="font-serif text-3xl md:text-5xl text-charcoal mt-4 text-balance">The MBJ Promise</h2>
          <div className="w-20 h-0.5 bg-gold mx-auto mt-6" />
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`group text-center p-8 bg-card rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold transition-colors duration-500">
                <feature.icon className="w-7 h-7 text-gold group-hover:text-charcoal transition-colors duration-500" />
              </div>
              <h3 className="font-serif text-xl text-charcoal mb-3">{feature.title}</h3>
              <p className="text-charcoal-light text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
