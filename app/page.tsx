import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturedCollections } from "@/components/featured-collections"
import { AboutSection } from "@/components/about-section"
import { ProductGrid } from "@/components/product-grid"
import { WhyChooseUs } from "@/components/why-choose-us"
import { Testimonials } from "@/components/testimonials"
import { BookingSection } from "@/components/booking-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <FeaturedCollections />
      <ProductGrid />
      <AboutSection />
      <WhyChooseUs />
      <Testimonials />
      <BookingSection />
      <Footer />
    </main>
  )
}
