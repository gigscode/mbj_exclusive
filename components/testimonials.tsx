"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Chioma Adeyemi",
    role: "Business Executive",
    image: "/professional-african-woman-portrait-headshot.jpg",
    quote:
      "MBJ Exclusive transformed my wardrobe completely. The attention to detail and quality of their pieces is unmatched. I feel like royalty every time I wear their designs.",
  },
  {
    name: "Amina Ibrahim",
    role: "Event Planner",
    image: "/placeholder.svg?height=100&width=100",
    quote:
      "From my wedding dress to my everyday pieces, MBJ has been my go-to for years. Their customer service is exceptional and the craftsmanship speaks for itself.",
  },
  {
    name: "Ngozi Okafor",
    role: "Architect",
    image: "/placeholder.svg?height=100&width=100",
    quote:
      "The perfect blend of traditional Nigerian aesthetics with modern sophistication. MBJ Exclusive truly understands the modern African woman.",
  },
  {
    name: "Folake Balogun",
    role: "Medical Doctor",
    image: "/placeholder.svg?height=100&width=100",
    quote:
      "I discovered MBJ Exclusive through a friend and haven't looked back since. Every piece I own from them receives countless compliments.",
  },
]

export function Testimonials() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
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

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [])

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, nextSlide])

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <span className="text-gold text-sm tracking-[0.3em] uppercase font-medium">Testimonials</span>
          <h2 className="font-serif text-3xl md:text-5xl text-charcoal mt-4 text-balance">What Our Clients Say</h2>
          <div className="w-20 h-0.5 bg-gold mx-auto mt-6" />
        </div>

        {/* Carousel */}
        <div
          className={`relative max-w-4xl mx-auto transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Quote Icon */}
          <div className="text-center mb-8">
            <Quote className="w-12 h-12 text-gold mx-auto fill-gold/20" />
          </div>

          {/* Testimonial Content */}
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4 md:px-12">
                  <p className="font-serif text-xl md:text-2xl text-charcoal text-center leading-relaxed mb-8 italic">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="flex flex-col items-center">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover mb-4 border-2 border-gold"
                    />
                    <h4 className="font-semibold text-charcoal">{testimonial.name}</h4>
                    <p className="text-charcoal-light text-sm">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-3 rounded-full bg-card shadow-md hover:bg-gold hover:text-charcoal transition-all duration-300 text-charcoal"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-3 rounded-full bg-card shadow-md hover:bg-gold hover:text-charcoal transition-all duration-300 text-charcoal"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-gold w-6" : "bg-charcoal/30"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
