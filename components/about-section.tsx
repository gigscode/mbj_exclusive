"use client"

import { useEffect, useRef, useState } from "react"

export function AboutSection() {
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
    <section ref={sectionRef} id="about" className="py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div
            className={`relative transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            }`}
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/elegant-african-woman-in-luxurious-gold-dress-fash.jpg"
                alt="MBJ Exclusive Fashion"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative frame */}
            <div className="absolute -bottom-6 -right-6 w-full h-full border-4 border-gold rounded-2xl -z-10" />
          </div>

          {/* Content */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`}
          >
            <span className="text-gold text-sm tracking-[0.3em] uppercase font-medium">Our Story</span>
            <h2 className="font-serif text-3xl md:text-5xl text-charcoal mt-4 mb-8 text-balance">
              About MBJ Exclusive
            </h2>
            <div className="space-y-6 text-charcoal-light leading-relaxed">
              <p>
                At MBJ Exclusive, we believe that fashion is more than clothing—it&apos;s an expression of identity,
                culture, and the art of self-presentation. Founded with a vision to redefine Nigerian luxury fashion, we
                create pieces that honor our rich heritage while embracing contemporary elegance.
              </p>
              <p>
                Every garment is meticulously handcrafted by our team of skilled artisans, using only the finest
                materials sourced from around the world. From the initial sketch to the final stitch, we pour our
                passion for excellence into every detail.
              </p>
              <p>
                Our commitment extends beyond fashion—we are dedicated to empowering the modern African woman,
                celebrating her strength, grace, and undeniable style. When you wear MBJ Exclusive, you don&apos;t just
                wear a garment; you wear a statement of sophistication.
              </p>
            </div>
            <div className="mt-10 flex items-center gap-8">
              <div>
                <span className="font-serif text-4xl text-gold">10+</span>
                <p className="text-sm text-charcoal-light mt-1">Years of Excellence</p>
              </div>
              <div className="w-px h-16 bg-border" />
              <div>
                <span className="font-serif text-4xl text-gold">5000+</span>
                <p className="text-sm text-charcoal-light mt-1">Happy Clients</p>
              </div>
              <div className="w-px h-16 bg-border" />
              <div>
                <span className="font-serif text-4xl text-gold">100%</span>
                <p className="text-sm text-charcoal-light mt-1">Handcrafted</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
